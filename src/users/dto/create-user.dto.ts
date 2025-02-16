import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsDateString,
  Matches,
} from 'class-validator';
import { Role } from 'src/auth/enums/roles.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description:
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password too weak. Include uppercase, lowercase, number and special character',
    },
  )
  password: string;

  @ApiProperty({
    enum: Role,
    example: Role.DRIVER,
    description: 'The role of the user',
  })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'The phone number of the user',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'Phone number must be in international format (e.g., +1234567890)',
  })
  phoneNumber?: string;

  @ApiPropertyOptional({
    example: '123 Main St, City, Country',
    description: 'The address of the user',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    example: '1990-01-01',
    description: 'The date of birth of the user in YYYY-MM-DD format',
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;
}
