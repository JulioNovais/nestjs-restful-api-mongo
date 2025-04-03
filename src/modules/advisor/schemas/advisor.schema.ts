import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { genSalt, hash, compare } from 'bcrypt-ts';

export type AdvisorDocument = HydratedDocument<Advisor>;

@Schema()
export class Advisor {
  _id: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;
}

export const AdvisorSchema = SchemaFactory.createForClass(Advisor);

AdvisorSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();

    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});
