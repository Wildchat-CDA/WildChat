import { IsEmail, IsString, MinLength } from 'class-validator';

export class InviteStudentDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
  name: string;

  @IsString()
  @MinLength(3, { message: 'Le prénom doit contenir au moins 3 caractères' })
  firstName: string;
}
