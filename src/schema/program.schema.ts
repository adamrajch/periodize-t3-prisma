import z from 'zod';

export const createProgramScehma = z.object({
  title: z
    .string()
    .min(2, 'Minimum name length is 2 characters')
    .max(30, 'Max name length is 20 characters'),
  description: z.string().max(30, 'Max name length is 20 characterse').nullish(),
});

export type CreateProgramInput = z.TypeOf<typeof createProgramScehma>;

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
