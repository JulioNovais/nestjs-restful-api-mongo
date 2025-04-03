import { z } from 'zod';

export const createSignInSchema = z
  .object({
    password: z.string(),
    email: z.string(),
  })
  .required();

export type SignInDto = z.infer<typeof createSignInSchema>;
