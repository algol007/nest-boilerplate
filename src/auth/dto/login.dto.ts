import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The password of the user' })
  password: string;
}
