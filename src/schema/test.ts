import { z } from 'zod';

export const Single = z.object({
  id: z.string(),
  name: z.string(),
  default: z.boolean(),
});
export const Cluster = z.object({
  type: z.literal('cluster'),
  name: z.string(),
  summary: z.string().optional(),
  sets: z.number(),
  arr: z.array(Single),
});

export const ProgramExerciseSchema = z.array(z.union([Single, Cluster]));
