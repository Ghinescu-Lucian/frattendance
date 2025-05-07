import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';

@Injectable()
export class MinioService {
  private readonly minioClient: Client;

  constructor(private configService: ConfigService) {
    this.minioClient = new Client({
      endPoint: this.configService.get<string>('MINIO_ENDPOINT') || 'localhost',
      port: parseInt(this.configService.get<string>('MINIO_PORT') || '9000', 10),
      useSSL: (this.configService.get<string>('MINIO_USE_SSL') || 'false') === 'true',
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY') || 'minioadmin',
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY') || 'minioadmin',
    });
    
    
  }

  async uploadFile(bucket: string, filename: string, fileBuffer: Buffer, mimeType: string) {
    const metaData = {
      'Content-Type': mimeType,
    };

    return this.minioClient.putObject(bucket, filename, fileBuffer, fileBuffer.length, metaData);
  }

  async ensureBucketExists(bucket: string) {
    const exists = await this.minioClient.bucketExists(bucket);
    if (!exists) {
      await this.minioClient.makeBucket(bucket, 'us-east-1');
    }
  }
}
