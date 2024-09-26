import DOMPurify from "dompurify";

export function sanitizeString(input: string): string {
  return DOMPurify.sanitize(input.trim());
}

export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function sanitizePassword(password: string): string {
  return password;
}

export function sanitizeNumber(input: string): number {
  const sanitized = DOMPurify.sanitize(input.trim());
  return isNaN(Number(sanitized)) ? 0 : Number(sanitized);
}

export function sanitizeBoolean(input: string): boolean {
  const sanitized = DOMPurify.sanitize(input.trim().toLowerCase());
  return sanitized === "true" || sanitized === "1";
}

export function sanitizeDate(input: string): Date | null {
  const sanitized = DOMPurify.sanitize(input.trim());
  const date = new Date(sanitized);
  return isNaN(date.getTime()) ? null : date;
}

export function sanitizeArray(input: string[]): string[] {
  return input.map((item) => DOMPurify.sanitize(item.trim())).filter(Boolean);
}

export function sanitizeObject(
  obj: Record<string, unknown>
): Record<string, unknown> {
  const sanitizedObj: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitizedObj[key] = sanitizeString(value);
    } else if (typeof value === "number") {
      sanitizedObj[key] = value;
    } else if (typeof value === "boolean") {
      sanitizedObj[key] = value;
    } else if (Array.isArray(value)) {
      sanitizedObj[key] = sanitizeArray(value as string[]);
    } else if (value instanceof Date) {
      sanitizedObj[key] = value;
    } else if (typeof value === "object" && value !== null) {
      sanitizedObj[key] = sanitizeObject(value as Record<string, unknown>);
    } else {
      sanitizedObj[key] = null;
    }
  }
  return sanitizedObj;
}
