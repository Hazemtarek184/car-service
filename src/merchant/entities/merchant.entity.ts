import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
class Product {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  productImage: string;

  @Prop({ required: true, min: 0 })
  quantity: number;

  @Prop({ required: true, min: 0 })
  cost: number;
}

@Schema({ timestamps: true })
export class Merchant extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  userId: Types.ObjectId;

  @Prop({ required: true })
  merchantName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop({ type: [Product], default: [] })
  products: Product[];
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);
