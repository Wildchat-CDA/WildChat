import { z } from "zod";

const nameSchema = z
  .string()
  .min(2, "Le champ doit contenir au moins 2 caractères")
  .regex(
    /^[A-Z\s'-]+$/,
    "Seules les majuscules, espaces, tirets et apostrophes sont autorisés"
  );

export const passwordSchema = z
  .string()
  .min(8, "Le mot de passe doit contenir au moins 8 caractères")
  .max(100, "Le mot de passe ne doit pas dépasser 100 caractères")
  .regex(
    /^(?=(.*[A-Z]){2,})(?=(.*[a-z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*]){2,})/,
    "Le mot de passe doit contenir au moins 2 majuscules, 2 minuscules, 2 chiffres et 2 caractères spéciaux"
  );

export const registerSchema = z
  .object({
    nom: nameSchema,
    prenom: nameSchema,
    email: z.string().email("Format d'email invalide"),
    password: passwordSchema,
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["repeatPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Format d'email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

import DOMPurify from "dompurify";

export function sanitizeName(input: string): string {
  return DOMPurify.sanitize(input.trim().toUpperCase());
}

export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function sanitizePassword(password: string): string {
  return password;
}
