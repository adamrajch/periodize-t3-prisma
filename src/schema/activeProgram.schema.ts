import { z } from 'zod';

export const ProgramIdInput = z.object({
  programId: z.string(),
});
