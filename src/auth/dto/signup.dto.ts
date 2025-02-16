import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Role } from 'src/auth/enums/roles.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateDriverDto } from 'src/driver/dto/create-driver.dto';

export class SignupDto {
  @ApiProperty({ example: 'John Doe', description: 'Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'test@example.com', description: 'Email address' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'P@ssw0rd!', description: 'Password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'DRIVER', description: 'Role' })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @ApiProperty({ required: false, type: CreateDriverDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateDriverDto)
  driverInfo?: CreateDriverDto;
}
