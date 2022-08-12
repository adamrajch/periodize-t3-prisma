/* eslint-disable no-new */
import { createProgramScehma } from 'src/schema/program.schema';
import { z } from 'zod';
import { createProtectedRouter } from './protected-router';

export const programRouter = createProtectedRouter()
  .mutation('create-program', {
    input: createProgramScehma,
    async resolve({ ctx, input }) {
      // if (!ctx.session?.user || !ctx.userId) {
      //   return new trpc.TRPCError({
      //     code: 'FORBIDDEN',
      //     message: 'Can not create a lift while logged out',
      //   });
      // }

      const program = await ctx.prisma.user.update({
        where: {
          id: ctx.userId,
        },
        data: {
          programs: {
            create: [
              {
                ...input,
              },
            ],
          },
        },
        include: {
          programs: true,
        },
      });

      return program;
    },
  })
  .query('getById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const program = await ctx.prisma.program.findUnique({
        where: {
          id: input.id,
        },
      });

      return program;
    },
  })
  .query('getHome', {
    async resolve({ ctx }) {
      const programs = await ctx.prisma.program.findMany();

      return programs;
    },
  })
  .query('getUserPrograms', {
    async resolve({ ctx }) {
      const { user } = ctx;
      const programs = await ctx.prisma.program.findMany({
        where: {
          authorId: user?.id,
        },
      });

      return programs;
    },
  })
  .mutation('editProgram', {
    input: z.object({
      id: z.string(),
      data: z.object({
        title: z.string(),
        description: z.string().nullish(),
        isPublic: z.boolean(),
        tags: z.any(),
      }),
    }),
    async resolve({ ctx, input }) {
      const program = await ctx.prisma.program.update({
        where: {
          id: input.id,
        },
        data: {
          ...input.data,
        },
      });

      return program;
    },
  });
