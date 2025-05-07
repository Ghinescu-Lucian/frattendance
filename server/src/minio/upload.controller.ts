import {
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors,
  } from '@nestjs/common';
  import { FilesInterceptor } from '@nestjs/platform-express';
  import { MinioService } from './minio.service';
  import { File } from 'multer';
  
  @Controller('upload')
  export class UploadController {
    constructor(private readonly minioService: MinioService) {}
  
    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    async uploadImages(@UploadedFiles() files: File[]) {
      const bucketName = 'images';
      await this.minioService.ensureBucketExists(bucketName);
  
      const uploadResults: { filename: string; status: string }[] = [];
  
      for (const file of files) {
        await this.minioService.uploadFile(
          bucketName,
          file.originalname,
          file.buffer,
          file.mimetype,
        );
  
        uploadResults.push({
          filename: file.originalname,
          status: 'uploaded',
        });
      }
  
      return {
        message: 'Files uploaded successfully',
        files: uploadResults,
      };
    }
  }
  