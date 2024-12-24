import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
} from '@nestjs/common';
import { StorageService } from 'seaweeds3client';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('storage')
export class AppController {
  constructor(private readonly storageService: StorageService) {}

  @Get('buckets')
  async listBuckets() {
    return await this.storageService.listBuckets();
  }

  @Post('buckets')
  async createBucket(@Body('bucketName') bucketName: string) {
    return await this.storageService.createBucket(bucketName);
  }

  @Delete('buckets')
  async deleteBucket(@Body('bucketName') bucketName: string) {
    return await this.storageService.deleteBucket(bucketName);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body('bucketName') bucketName: string,
    @Body('objectName') objectName: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    return await this.storageService.uploadFile(
      bucketName,
      objectName,
      file.buffer,
    );
  }

  @Delete('objects')
  async deleteObject(
    @Body('bucketName') bucketName: string,
    @Body('objectName') objectName: string,
  ) {
    return await this.storageService.deleteObject(bucketName, objectName);
  }

  @Get('download-url')
  async getPresignedDownloadUrl(
    @Query('bucketName') bucketName: string,
    @Query('objectName') objectName: string,
    @Query('expiresIn') expiresIn?: number,
  ) {
    return await this.storageService.getPresignedDownloadUrl(
      bucketName,
      objectName,
      expiresIn,
    );
  }

  @Get('upload-url')
  async getPresignedUploadUrl(
    @Query('bucketName') bucketName: string,
    @Query('objectName') objectName: string,
    @Query('expiresIn') expiresIn?: number,
  ) {
    return await this.storageService.getPresignedUploadUrl(
      bucketName,
      objectName,
      expiresIn,
    );
  }

  @Get('objects')
  async downloadObject(
    @Query('bucketName') bucketName: string,
    @Query('objectName') objectName: string,
  ) {
    const buffer = await this.storageService.downloadObject(
      bucketName,
      objectName,
    );
    return new StreamableFile(buffer);
  }
}
