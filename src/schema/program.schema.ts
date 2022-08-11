import z from 'zod';

export const createProgramScehma = z.object({
  title: z
    .string()
    .min(2, 'Minimum name length is 2 characters')
    .max(30, 'Max name length is 20 characters'),
  description: z.string().max(30, 'Max name length is 20 characterse').nullish(),
});

export type CreateProgramInput = z.TypeOf<typeof createProgramScehma>;

export const getSingleProgramSchema = z.object({
  programId: z.string().uuid(),
});
