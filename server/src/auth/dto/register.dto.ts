import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
  name: string;

  @IsString()
  @MinLength(3, { message: 'Le prénom doit contenir au moins 3 caractères' })
  firstName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial',
    },
  )
  password: string;
}
