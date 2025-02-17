import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDriverDto {
  @ApiProperty({ example: 'John Doe', description: 'Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '1234567890', description: 'License number' })
  @IsString()
  @IsNotEmpty()
  licenseNumber: string;

  @ApiProperty({ example: 5, description: 'Experience years' })
  @IsNumber()
  @IsNotEmpty()
  experienceYears: number;

  @ApiProperty({ example: '1234567890', description: 'Phone number' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: '1234567890', description: 'Address' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'Truck model', description: 'Truck model' })
  @IsString()
  @IsNotEmpty()
  truckModel: string;

  @ApiProperty({ example: '1234567890', description: 'Truck plate number' })
  @IsString()
  @IsNotEmpty()
  truckPlateNumber: string;

  @ApiProperty({ example: 1000, description: 'Truck capacity' })
  @IsNumber()
  @IsNotEmpty()
  truckCapacity: number;

  @ApiProperty({ example: true, description: 'Is available' })
  @IsBoolean()
  @IsNotEmpty()
  isAvailable: boolean;

  @ApiProperty({ example: true, description: 'Is active' })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
