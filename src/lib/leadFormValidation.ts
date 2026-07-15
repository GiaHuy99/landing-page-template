export type LeadFieldErrors = {
  name?: string;
  phone?: string;
  email?: string;
};

export function normalizePhone(input: string): string {
  return input.replace(/\D/g, "");
}

export function validateLeadName(name: string): string | undefined {
  if (!name.trim()) return "Please enter your name.";
  return undefined;
}

export function validateLeadPhone(phone: string): string | undefined {
  const digits = normalizePhone(phone);
  if (digits.length === 0) return "Please enter your phone number.";
  if (digits.length < 8 || digits.length > 15) {
    return "Phone number must be 8–15 digits.";
  }
  return undefined;
}

export function validateLeadEmail(email: string): string | undefined {
  if (!email.trim()) return undefined;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return "Please enter a valid email address.";
  }
  return undefined;
}

export function validateLeadContact(
  name: string,
  phone: string,
  email?: string,
): LeadFieldErrors {
  const errors: LeadFieldErrors = {};
  const nameError = validateLeadName(name);
  const phoneError = validateLeadPhone(phone);
  const emailError = email !== undefined ? validateLeadEmail(email) : undefined;
  if (nameError) errors.name = nameError;
  if (phoneError) errors.phone = phoneError;
  if (emailError) errors.email = emailError;
  return errors;
}
