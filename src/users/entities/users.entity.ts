import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/enums/roles.enum';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: Role, required: true })
  role: Role;

  @Prop()
  phoneNumber?: string;

  @Prop()
  address?: string;

  @Prop()
  dateOfBirth?: Date;

  @Prop()
  resetPasswordCode?: string;

  @Prop()
  resetPasswordCodeExpiresAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
