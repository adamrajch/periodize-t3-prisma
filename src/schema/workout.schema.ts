import { z } from 'zod';

const Record = z.object({
  exerciseId: z.string(),
  name: z.string(),
  sets: z.number(),
  reps: z.number(),
  rpe: z.number().gte(0).lte(10).nullish(),
  percentage: z.number().gte(0).lte(100).nullish(),
  distance: z
    .object({
      unit: z.string(),
      length: z.number(),
    })
    .nullish(),
  weight: z
    .object({
      unit: z.string(),
      load: z.number(),
    })
    .nullish(),
  time: z.number().nullish(),
});

const Workout = z.object({
  name: z.string(),
  performedAt: z.string(),
  exercises: z.array(Record),
});

export const CreateProgramWorkoutInput = z.object({
  programId: z.string(),
  workout: Workout,
});
