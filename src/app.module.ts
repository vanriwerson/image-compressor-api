import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImagesModule } from './modules/image.module';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './middlewares/error.middleware';
import mongoConfig from './config/mongo.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: mongoConfig.url,
        ...mongoConfig.options,
      }),
    }),
    ImagesModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class AppModule {}
