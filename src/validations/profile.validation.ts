import { z } from 'zod';

// Mirrors the backend profile update validators (name, username, bio).
// All fields are optional since the update endpoint only validates the
// fields that are present in the request body.
export const profileSchema = z.object({
   name: z
      .string()
      .min(2, 'Name must be between 2 and 50 characters')
      .max(50, 'Name must be between 2 and 50 characters')
      .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
      .optional(),
   username: z
      .string()
      .min(3, 'Username must be between 3 and 30 characters')
      .max(30, 'Username must be between 3 and 30 characters')
      .regex(
         /^[a-z0-9_]+$/,
         'Username can only contain lowercase letters, numbers, and underscores',
      )
      .refine((val) => !val.startsWith('_') && !val.endsWith('_'), {
         message: 'Username cannot start or end with underscore',
      })
      .optional(),
   bio: z
      .string()
      .min(1, 'Bio must be between 1 and 200 characters')
      .max(200, 'Bio must be between 1 and 200 characters')
      .optional(),
   avatarUrl: z
      .string()
      .url('Avatar url must be a valid URL')
      .min(14, 'Avatar url must be between 14 and 500 characters')
      .max(500, 'Avatar url must be between 14 and 500 characters')
      .optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
