import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateMerchantDto {
  @ApiProperty({ type: Types.ObjectId, required: false, readOnly: true })
  @IsString()
  @IsNotEmpty()
  userId: Types.ObjectId;

  @ApiProperty({ required: true, type: String, example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  merchantName: string;

  @ApiProperty({ required: true, type: String, example: '123 Main St' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ required: true, type: String, example: 'New York' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ required: true, type: String, example: '10001' })
  @IsString()
  @IsNotEmpty()
  zipCode: string;
}

export class AddProductDto {
  @ApiProperty({ required: true, type: String, example: 'Product Name' })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({
    required: true,
    type: String,
    example: 'https://example.com/product.jpg',
  })
  @IsString()
  @IsNotEmpty()
  productImage: string;

  @ApiProperty({ required: true, type: Number, example: 10 })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ required: true, type: Number, example: 10 })
  @IsNotEmpty()
  cost: number;
}
