import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Driver extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  licenseNumber: string;

  @Prop({ required: true })
  experienceYears: number;

  @Prop()
  phoneNumber: string;

  @Prop()
  address: string;

  // Tow Truck Information
  @Prop({ required: true })
  truckModel: string;

  @Prop({ required: true })
  truckPlateNumber: string;

  @Prop({ required: true })
  truckCapacity: number;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ default: true })
  isActive: boolean;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
