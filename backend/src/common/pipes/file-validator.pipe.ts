import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidatorPipe implements PipeTransform {
  transform(files: Express.Multer.File[] | Express.Multer.File) {
    if (!files || (Array.isArray(files) && files.length == 0)) {
      throw new BadRequestException('No files uploaded');
    }

    if (Array.isArray(files)) for (const file of files) this.validateFile(file);
    else this.validateFile(files);

    return files;
  }

  private validateFile(file: Express.Multer.File) {
    const allowedFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
    const maxSizeInBytes = 5 * 1024 * 1024;

    if (!allowedFormats.includes(file.mimetype)) {
      throw new BadRequestException(`Invalid file format for '${file.originalname}'`);
    }

    if (file.size > maxSizeInBytes) {
      throw new BadRequestException(`File '${file.originalname}' exceeds 5MB limit`);
    }
  }
}
