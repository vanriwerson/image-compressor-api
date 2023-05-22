import { Body, Controller, Post } from '@nestjs/common';
import { ImagesService } from '../services/image.service';

@Controller('image')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post('save')
  async saveImage(
    @Body('image') imageUrl: string,
    @Body('compress') compress: number,
  ) {
    const image = await this.imagesService.create(imageUrl, compress);
    return {
      localpath: {
        original: image.originalPath,
        thumb: image.thumbPath,
      },
      metadata: image.metadata,
    };
  }
}
