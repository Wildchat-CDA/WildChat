import { IsString, MinLength, Matches } from 'class-validator';

export class SetPasswordDto {
  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial',
    },
  )
  password: string;


  @IsString()
  @MinLength(8)
  confirmPassword: string;
}
