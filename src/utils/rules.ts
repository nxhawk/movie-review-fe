import * as zod from "zod";

const authValidation = {
  email: zod
    .string()
    .min(1, { message: "Email is required" })
    .email("Email is invalid")
    .max(160, "Maximum length is 160 characters"),
  password: zod
    .string()
    .min(1, "Password is required")
    .min(8, "Length from 8 to 160 characters")
    .max(160, "Length from 8 to 160 characters"),
  confirmPassword: zod
    .string()
    .min(1, "Confirm password is required")
    .min(8, "Length from 8 to 160 characters")
    .max(160, "Length from 8 to 160 characters"),
  name: zod.string().min(1, "Name is required").max(160, "Maximum length is 160 characters").trim(),
};

export const loginSchema = zod.object({
  email: authValidation.email,
  password: authValidation.password,
});

export const registerSchema = zod
  .object({
    email: authValidation.email,
    password: authValidation.password,
    confirmPassword: authValidation.confirmPassword,
    name: authValidation.name,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password does not match",
    path: ["confirmPassword"],
  });

export const resetPasswordSchema = zod
  .object({
    password: authValidation.password,
    confirmPassword: authValidation.confirmPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password does not match",
    path: ["confirmPassword"],
  });

export type LoginSchema = zod.infer<typeof loginSchema>;
export type RegisterSchema = zod.infer<typeof registerSchema>;
export type ResetPasswordSchema = zod.infer<typeof resetPasswordSchema>;
