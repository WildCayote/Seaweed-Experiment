import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeaweedModule } from 'seaweeds3client';

@Module({
  imports: [
    SeaweedModule.forRoot({
      s3_endpoint: 'http://localhost:8333',
      access_key: 'any',
      secret_key: 'any',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
