import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImagesModule } from './modules/image.module';
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
})
export class AppModule {}
