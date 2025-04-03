import { z } from 'zod';

export const createAdvisorSchema = z
  .object({
    name: z.string(),
    password: z.string(),
    email: z.string(),
  })
  .required();

export type CreateAdvisorDto = z.infer<typeof createAdvisorSchema>;
