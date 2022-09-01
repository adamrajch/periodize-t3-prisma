import z from 'zod';

export const createExerciseScehma = z.object({
  name: z
    .string()
    .min(2, 'Minimum name length is 2 characterse')
    .max(20, 'Minimum name length is 20 characterse'),
  category: z.array(z.string()),
  load: z.boolean(),
  distance: z.boolean(),
  time: z.boolean(),
});

export type CreateLiftInput = z.TypeOf<typeof createExerciseScehma>;

export const getSingleLiftSchema = z.object({
  liftId: z.string().uuid(),
});
