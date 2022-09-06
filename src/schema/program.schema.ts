import z from 'zod';

export const ProgramRecordSchema = z.object({
  sets: z.number(),
  reps: z.number(),
  rpe: z.number().gte(0).lte(10).nullish(),
  percentage: z.number().gte(0).lte(100).nullish(),
  distance: z.object({
    unit: z.string(),
    length: z.number()
  }).nullish(),
  weight: z.object({
    unit: z.string(),
    load: z.number()
  }).nullish(),
  time: z.number().nullish()
});
export const ProgramLiftSchema = z.object({
  id: z.string(),
  name: z.string(),
  time: z.boolean(),
  load: z.boolean(),
  distance: z.boolean(),
  records: z.array(ProgramRecordSchema),
});
export const ProgramClusterSchema = z.object({
  type: z.string(),
  name: z.string(),
  rest: z.number().nullish(),
  restUnit: z.string().nullish(),
  summary: z.string().nullish(),
  sets: z.number(),
  lifts: z.array(ProgramLiftSchema),
});
export const ProgramExerciseSchema = z.array(ProgramLiftSchema.or(ProgramClusterSchema));

export const ProgramDaySchema = z.array(
  z.object({
    name: z.string(),
    summary: z.string().nullish(),
    exercises: ProgramExerciseSchema,
  })
);
export const ProgramWeekSchema = z.array(
  z.object({
    name: z.string(),
    summary: z.string().nullish(),
    days: ProgramDaySchema,
  })
);

export const ProgramBlockSchema = z.array(
  z.object({
    name: z.string(),
    summary: z.string().nullish(),
    weeks: ProgramWeekSchema,
  })
);

export const createProgramSchema = z.object({
  title: z
    .string()
    .min(2, 'Minimum name length is 2 characters')
    .max(30, 'Max name length is 20 characters'),
  description: z.string().max(30, 'Max name length is 20 characterse').nullish(),
  schema: ProgramBlockSchema,
});

export type CreateProgramInput = z.TypeOf<typeof createProgramSchema>;

export const editProgramSchema = z.object({
  id: z.string(),
  data: ProgramBlockSchema,
});

export const getSingleProgramSchema = z.object({
  programId: z.string().uuid(),
});
