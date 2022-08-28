import z from 'zod';

export const ProgramRecordSchema = z.object({
  sets: z.number(),
  reps: z.number(),
  load: z.number().nullish(),
  distance: z.number().nullish(),
  rpe: z.number().gte(0).lte(10).nullish(),
  percentage: z.number().gte(0).lte(100).nullish(),
});
export const ProgramLiftSchema = z.object({
  name: z.string(),
  record: z.array(ProgramRecordSchema),
});
export const ProgramClusterSchema = z.object({
  name: z.string(),
  lifts: z.array(ProgramLiftSchema),
  rest: z.number().nullish(),
  restUnit: z.string().nullish(),
  summary: z.string().nullish(),
  sets: z.number(),
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
  schema: z.object({
    blocks: ProgramBlockSchema,
  }),
});

export type CreateProgramInput = z.TypeOf<typeof createProgramSchema>;

const blockSchema = z.array(
  z.object({
    name: z.string(),
    summary: z.string().nullish(),
    phase: z.string(),
    weeks: z
      .array(
        z.object({
          name: z.string(),
          summary: z.string().nullish(),
          days: z
            .array(
              z.object({
                name: z.string(),
                summary: z.string().nullish(),
              })
            )
            .nullish(),
        })
      )
      .nullish(),
  })
);

export const editProgramSchema = z.object({
  id: z.string(),
  data: blockSchema,
});

export const getSingleProgramSchema = z.object({
  programId: z.string().uuid(),
});
