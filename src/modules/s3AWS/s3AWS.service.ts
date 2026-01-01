import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  CopyObjectCommand,
} from '@aws-sdk/client-s3';
import { lookup } from 'mime-types';
import * as path from 'path';
import sharp from 'sharp';
import { IUploadSingleFile } from '../../common/interfaces/aws.interface';
import { ALLOWED_IMAGE_EXTENSIONS } from '../../common/pipes/file-validator.pipe';
import * as fs from 'fs';

@Injectable()
export class AwsService {
  private client: S3Client;
  private bucketName = this.configService.get('S3_BUCKET_NAME');

  constructor(private readonly configService: ConfigService) {
    const s3_region = this.configService.get('S3_REGION');

    if (!s3_region) {
      throw new Error('S3_REGION not found in environment variables');
    }

    this.client = new S3Client({
      region: s3_region,
      credentials: {
        accessKeyId: this.configService.get('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
      },
      forcePathStyle: true,
      endpoint: configService.get<string>('S3_ENDPOINT'),
    });
  }

  async uploadSingleFile({
    fileMetadata,
    folderName = '',
    isPublic = true,
    contentType,
    watermark = false,
  }: {
    fileMetadata: Partial<Express.Multer.File> | { file: Buffer; fileName: string };
    folderName?: string;
    isPublic?: boolean;
    contentType?: string;
    watermark?: boolean;
  }): Promise<IUploadSingleFile> {
    let ext: string;
    let extractedContentType: string;
    let bufferFile: Buffer;
    let fileName: string;
    let key: string;

    if (`file` in fileMetadata) {
      bufferFile = Buffer.from(fileMetadata.file);
      fileName = fileMetadata.fileName;
      ext = path.extname(fileName);
      key = `${folderName}/${Date.now()}-${fileName}`;
    } else {
      ext = path.extname(fileMetadata.originalname);
      bufferFile = Buffer.from(fileMetadata.buffer);
      key = `${folderName}/${Date.now()}${ext}`;
    }

    extractedContentType = contentType || lookup(ext) || 'application/octet-stream';

    const isImageFile = ALLOWED_IMAGE_EXTENSIONS.includes(ext);

    let processedBuffer = bufferFile;

    if (isImageFile) {
      if (watermark) processedBuffer = await this.addFullPageWatermark(processedBuffer);

      processedBuffer = await this.optimizeBuffer(processedBuffer);
    }

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: processedBuffer,
      ContentType: extractedContentType,
      ACL: isPublic ? 'public-read' : 'private',
      ContentLength: processedBuffer.length,
    });

    const uploadResult = await this.client.send(command);

    if (uploadResult.$metadata.httpStatusCode !== 200) {
      throw new BadRequestException('File upload failed');
    }

    return {
      url: (await this.getFileUrl(key)).url,
      key,
      isPublic,
    };
  }

  async getFileUrl(key: string) {
    return { url: `${this.configService.get('STORAGE_BASE_URL')}/${key}` };
  }

  async getFileBuffer(key: string, bucket: string = this.bucketName): Promise<Buffer> {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const response = await this.client.send(command);

    if (response.$metadata.httpStatusCode !== 200) throw new BadRequestException('Get file failed');

    const stream = response.Body.transformToWebStream() as ReadableStream;

    const chunks: Buffer[] = [];

    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }

    return Buffer.concat(chunks);
  }

  async uploadMultiFiles(
    folderName: string,
    files: Express.Multer.File[],
    isPublic: boolean = false,
    isWatermarked: boolean = false,
  ): Promise<IUploadSingleFile[] | undefined> {
    const uploadedFiles: IUploadSingleFile[] = [];

    try {
      for (const file of files) {
        const uploadedFile = await this.uploadSingleFile({ fileMetadata: file, folderName, isPublic, watermark: isWatermarked });

        uploadedFiles.push(uploadedFile);
      }

      return uploadedFiles;
    } catch (error) {
      console.log(error);

      await this.removeFiles(uploadedFiles.map((file) => file.key));
    }
  }

  async uploadTempFile(file: Partial<Express.Multer.File>, folderName: string) {
    // const folderName = `academy/course/temp`;
    return await this.uploadSingleFile({ fileMetadata: file, folderName, isPublic: true });
  }

  async removeFolder(folderPath: string) {
    const listCommand = new ListObjectsV2Command({
      Bucket: this.bucketName,
      Prefix: folderPath,
    });

    const { Contents } = await this.client.send(listCommand);

    if (!Contents || Contents.length === 0) return;

    for (const { Key } of Contents) {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: Key!,
      });

      await this.client.send(deleteCommand);
    }
  }

  async removeFile(key: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const deleteResult = await this.client.send(command);

      return deleteResult;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async removeFiles(keys: string[]) {
    if (keys.length === 0) return;

    try {
      for (const key of keys) await this.removeFile(key);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async moveFile(oldKey: string, newKey: string, isPublic: boolean = true): Promise<void> {
    const command = new CopyObjectCommand({
      Bucket: this.bucketName,
      CopySource: `${this.bucketName}/${oldKey}`,
      Key: newKey,
      ACL: isPublic ? 'public-read' : 'private',
    });

    const copyResult = await this.client.send(command);

    if (copyResult.$metadata.httpStatusCode !== 200) throw new BadRequestException('Move file failed.');

    await this.removeFile(oldKey);
  }

  async copyFile(oldKey: string, newKey: string, isPublic: boolean = true): Promise<void | never> {
    const command = new CopyObjectCommand({
      Bucket: this.bucketName,
      CopySource: `${this.bucketName}/${oldKey}`,
      Key: newKey,
      ACL: isPublic ? 'public-read' : 'private',
    });

    const copyResult = await this.client.send(command);

    if (copyResult.$metadata.httpStatusCode !== 200) throw new BadRequestException('Copy file failed.');
  }

  private async addFullPageWatermark(imageBuffer: Buffer): Promise<Buffer> {
    const watermarkPath = process.env.WATERMARK_IMAGE_PATH;
    if (!watermarkPath) return imageBuffer;

    const { width, height } = await sharp(imageBuffer).metadata();
    if (!width || !height) return imageBuffer;

    const resizedWatermark = await sharp(fs.readFileSync(path.resolve(watermarkPath)))
      .resize(width, height)
      .toBuffer();

    const outputBuffer = await sharp(imageBuffer)
      .composite([
        {
          input: resizedWatermark,
        },
      ])
      .toBuffer();

    return outputBuffer;
  }

  private optimizeBuffer(buffer: Buffer): Promise<Buffer> {
    return sharp(buffer)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 80 })
      .png({ quality: 80 })
      .webp({ quality: 80 })
      .toBuffer();
  }
}
