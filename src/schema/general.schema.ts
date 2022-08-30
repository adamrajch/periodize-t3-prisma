import { z } from 'zod';

export const InputIdSchema = z.object({
  id: z.string(),
});

export const InputStringSchema = z.object({
  name: z.string(),
});
