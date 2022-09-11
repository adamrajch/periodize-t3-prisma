import { z } from 'zod';

export const ProgramIdInput = z.object({
  programId: z.string(),
});
export const IdInput = z.object({
  id: z.string(),
});
