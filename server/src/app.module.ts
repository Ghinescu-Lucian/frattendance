import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinioService } from './minio/minio.service';
import { UploadController } from './minio/upload.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes config available app-wide
    }),
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, MinioService],
})
export class AppModule {}
