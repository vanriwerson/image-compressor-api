import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop()
  originalPath: string;

  @Prop()
  thumbPath: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
