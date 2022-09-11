/* eslint-disable no-new */

import { IdInput, ProgramIdInput } from 'src/schema/activeProgram.schema';
import { createProtectedRouter } from './protected-router';

export const activeProgramRouter = createProtectedRouter()
  .mutation('createActiveProgram', {
    input: ProgramIdInput,
    async resolve({ ctx, input }) {
      const program = await ctx.prisma.program.findFirst({
        where: {
          id: input.programId,
        },
      });

      if (!program) {
        return null;
      }

      const activeProgram = await ctx.prisma.activeProgram.create({
        data: {
          title: program.title,
          schema: program.schema || { hi: 'nani' },
          summary: program.description,
          user: {
            connect: { id: ctx.userId },
          },
          program: {
            connect: {
              id: input.programId,
            },
          },
        },
      });

      return activeProgram;
    },
  })
  .mutation('deleteActiveProgram', {
    input: ProgramIdInput,
    async resolve({ ctx, input }) {
      const program = await ctx.prisma.activeProgram.delete({
        where: {
          id: input.programId,
        },
      });

      return program;
    },
  })
  .query('getAll', {
    async resolve({ ctx }) {
      const programs = await ctx.prisma.activeProgram.findMany({
        where: {
          userId: ctx.userId,
        },
      });

      return programs;
    },
  })
  .query('getById', {
    input: IdInput,
    async resolve({ ctx, input }) {
      const programs = await ctx.prisma.activeProgram.findFirst({
        where: {
          id: input.id,
        },
      });

      return programs;
    },
  });
