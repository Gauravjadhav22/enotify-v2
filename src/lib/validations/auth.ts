import * as z from "zod"

export const userLoginSchema = z.object({
  phoneNumber: z.string(),
  password: z.string(),
})

export const userRegisterSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
})

export const forgotPasswordSchema = z.object({
  phoneNumber: z.string(),
})

export const resetPasswordSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
