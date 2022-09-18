import z from 'zod';

export const ProgramRecordSchema = z.object({
  sets: z.number(),
  reps: z.number(),
  rpe: z.number().gte(0).lte(10).optional(),
  percent: z.number().gte(0).lte(100).optional(),
  distance: z.number().optional(),
  load: z.number().optional(),
  loadUnit: z.string().optional(),
  time: z.number().optional(),
});
export const ProgramLiftSchema = z.object({
  type: z.literal('single'),
  id: z.string(),
  name: z.string(),
  time: z.boolean(),
  load: z.boolean(),
  distance: z.boolean(),
  records: z.array(ProgramRecordSchema),
});

export const ProgramClusterSchema = z.object({
  type: z.literal('cluster'),
  name: z.string(),
  rest: z.number().optional(),
  summary: z.string().optional(),
  sets: z.number(),
  lifts: z.array(ProgramLiftSchema),
});
// export const ProgramExerciseSchema = z.array(z.union([ProgramLiftSchema, ProgramClusterSchema]));

export const ProgramExerciseSchema = z.array(
  z.discriminatedUnion('type', [ProgramLiftSchema, ProgramClusterSchema])
);
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
