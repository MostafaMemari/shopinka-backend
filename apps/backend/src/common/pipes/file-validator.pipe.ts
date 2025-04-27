import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidatorPipe implements PipeTransform {
    transform(files: Express.Multer.File[]) {
        if (!files || files.length === 0) {
            throw new BadRequestException('No files uploaded');
        }

        for (const file of files) {
            if (!['image/jpg', 'image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
                throw new BadRequestException(`Invalid file format for '${file.originalname}'`);
            }

            const maxSizeInBytes = 5 * 1024 * 1024;
            if (file.size > maxSizeInBytes) {
                throw new BadRequestException(`File '${file.originalname}' exceeds 5MB limit`);
            }
        }

        return files;
    }
}
