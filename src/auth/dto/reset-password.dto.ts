import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ example: '123456', description: 'Reset password code' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ example: 'P@ssw0rd!1', description: 'New password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  newPassword: string;
}
