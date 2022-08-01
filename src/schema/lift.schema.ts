import z from 'zod';

export const createLiftScehma = z.object({
  name: z
    .string()
    .min(2, 'Minimum name length is 2 characterse')
    .max(20, 'Minimum name length is 20 characterse'),
});

export type CreateLiftInput = z.TypeOf<typeof createLiftScehma>;

export const getSingleLiftSchema = z.object({
  liftId: z.string().uuid(),
});
