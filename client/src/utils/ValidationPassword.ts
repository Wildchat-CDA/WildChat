import { z } from 'zod';


export const passwordSchema = z.string()

.min(8, "le mot de passe doit contenir au moins 8 caracteres")
.max(100, "Le mot de passe ne doit pas dépasser 100 caractères")
.regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
.regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
.regex(/[!@#$%^&*(),.?":{}|<>]/, "Le mot de passe doit contenir au moins un caractère spécial")
.regex(/\d/, "le mot passe doit contenir au moins un chiffre")



export const validatePasswordStrength = (password: string): {isValid: boolean; errors: string[]} => {
    const result = passwordSchema.safeParse(password);
    if(result.success){
        return { isValid: true, errors: [] };
    }
    return { isValid: false, errors: result.error.errors.map(error => error.message) }
}