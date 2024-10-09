import { z } from "zod";

export const passwordSchema = z.string();

export const validatePasswordStrength = (
  password: string
): { isValid: boolean; errors: string[] } => {
  const result = passwordSchema.safeParse(password);
  if (result.success) {
    return { isValid: true, errors: [] };
  }
  return {
    isValid: false,
    errors: result.error.errors.map((error) => error.message),
  };
};
