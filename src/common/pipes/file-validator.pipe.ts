import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

export const allowedImageFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

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
    if (file.mimetype == 'application/octet-stream') return this.validateFontFormat(file);

    const maxSizeInBytes = 5 * 1024 * 1024;

    if (!allowedImageFormats.includes(file.mimetype)) {
      throw new BadRequestException(`Invalid file format for '${file.originalname}'`);
    }

    if (file.size > maxSizeInBytes) {
      throw new BadRequestException(`File '${file.originalname}' exceeds 5MB limit`);
    }
  }

  validateFontFormat(file: Express.Multer.File): never | void {
    const allowedFontFormats = ['ttf', 'otf', 'woff', 'woff2'];

    const maxSizeInBytes = 2 * 1024 * 1024;

    const ext = file.originalname.toLowerCase().split('.').pop();

    if (!allowedFontFormats.includes(ext || file.mimetype)) {
      throw new BadRequestException(`Invalid font format for '${file.originalname}'`);
    }

    if (file.size > maxSizeInBytes) {
      throw new BadRequestException(`Font file '${file.originalname}' exceeds 2MB limit`);
    }
  }
}
