import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateMerchantDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: Types.ObjectId;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  merchantName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  zipCode: string;
}

export class AddProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productImage: string;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  cost: number;
}
