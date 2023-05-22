import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from '../models/image.model';
import * as sharp from 'sharp';
import axios from 'axios';
import * as path from 'path';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
  ) {}

  async create(imageUrl: string, compress: number): Promise<ImageDocument> {
    try {
      // Faz o download da imagem a partir da URL
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });
      const imageBuffer = response.data;

      // Gera o nome do arquivo e o caminho
      const fileName = path.basename(imageUrl);
      const originalPath = path.join('data/original', fileName);

      const thumbFileName = `${path.parse(fileName).name}_thumb${
        path.parse(fileName).ext
      }`;
      const thumbPath = path.join('data/thumb/', thumbFileName);

      // Salva a imagem original no sistema de arquivos
      await sharp(imageBuffer).toFile(originalPath);

      // Gera a versão reduzida da imagem
      const image = sharp(imageBuffer);
      const { width, height } = await image.metadata();
      const maxWidth = 720;
      const maxHeight = Math.round((maxWidth / width) * height);

      if (Math.max(width, height) > maxWidth) {
        await image
          .resize(maxWidth, maxHeight)
          .jpeg({ quality: Math.floor(compress * 100) })
          .toFile(thumbPath);
      } else {
        // Se a maior dimensão for menor ou igual a 720px, faz uma cópia da imagem original
        await sharp(imageBuffer).toFile(thumbPath);
      }

      // Obtém os metadados do exif
      const metadata = await sharp(imageBuffer).metadata();

      // Salva os metadados no MongoDB
      const createdImage = new this.imageModel({
        originalPath,
        thumbPath,
        metadata: metadata.exif,
      });

      return createdImage.save();
    } catch (error) {
      throw new Error('Falha ao processar a imagem');
    }
  }
}
