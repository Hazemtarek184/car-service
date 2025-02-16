import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: 'P@ssw0rd!', description: 'Current password' })
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @ApiProperty({ example: 'P@ssw0rd!1', description: 'New password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  newPassword: string;
}
