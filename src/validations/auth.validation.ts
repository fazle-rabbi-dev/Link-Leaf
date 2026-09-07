import { z } from "zod";

export const loginSchema = z
   .object({
      emailOrUsername: z.string().min(1, "Email or username is required"),
      password: z
         .string()
         .min(6, "Password must be between 6 and 30 characters")
         .max(30, "Password must be between 6 and 30 characters"),
   })
   .refine(
      (data) => {
         const value = data.emailOrUsername;
         // Check if it's a valid email or a valid username
         const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
         const isUsername = /^[a-z0-9_]{3,30}$/.test(value) && !value.startsWith("_") && !value.endsWith("_");
         return isEmail || isUsername;
      },
      {
         message: "Please enter a valid email or username",
         path: ["emailOrUsername"],
      }
   );

export const registerSchema = z.object({
   name: z
      .string()
      .min(2, "Name must be between 2 and 50 characters")
      .max(50, "Name must be between 2 and 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
   username: z
      .string()
      .min(3, "Username must be between 3 and 30 characters")
      .max(30, "Username must be between 3 and 30 characters")
      .regex(
         /^[a-z0-9_]+$/,
         "Username can only contain lowercase letters, numbers, and underscores"
      )
      .refine((val) => !val.startsWith("_") && !val.endsWith("_"), {
         message: "Username cannot start or end with underscore",
      }),
   email: z.string().email("Invalid email format"),
   password: z
      .string()
      .min(6, "Password must be between 6 and 30 characters")
      .max(30, "Password must be between 6 and 30 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

export const resetPasswordSchema = z.object({
   newPassword: z
      .string()
      .min(6, "Password must be between 6 and 30 characters")
      .max(30, "Password must be between 6 and 30 characters"),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
