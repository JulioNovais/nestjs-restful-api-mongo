import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { genSalt, hash, compare } from 'bcrypt-ts';
import { UUID } from 'crypto';
export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.String, ref: 'Advisor' })
  advisorId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
