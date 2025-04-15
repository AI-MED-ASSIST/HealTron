// src/utils/validations.ts
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone: any): boolean => {
  const regex = /^\d{10}$/;
  return regex.test(phone);
};

export const validatePassword = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword && password.length >= 6;
};
