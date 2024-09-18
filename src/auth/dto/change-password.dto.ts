import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ description: 'Current password' })
  currentPassword: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ description: 'New password' })
  newPassword: string;
}
