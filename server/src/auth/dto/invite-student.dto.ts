import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class InviteStudentDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Le prénom doit contenir au moins 3 caractères' })
  firstName: string;
}