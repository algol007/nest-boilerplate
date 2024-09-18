import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/users/roles.enum';

export class RegisterDto {
  @IsEmail()
  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ description: 'The password of the user' })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The role of the user' })
  role: UserRole;
}
