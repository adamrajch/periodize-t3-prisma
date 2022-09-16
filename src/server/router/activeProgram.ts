/* eslint-disable no-new */

import { TRPCError } from '@trpc/server';
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

      if (!program || !program.schema) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred, please try again later.',
          // optional: pass the original error to retain stack trace
          cause: 'need to provide program schema',
        });
      }

      const template: { block: number; week: number; day: number; dayName: any; exercises: any }[] =
        [];
      if (program?.schema && Array.isArray(program.schema)) {
        program?.schema?.forEach((block: any, bi: number) => {
          block.weeks.forEach((week: any, wi: number) => {
            week.days.forEach((day: any, di: number) => {
              template.push({
                block: bi,
                week: wi,
                day: di,
                dayName: day.name,
                exercises: day.exercises,
              });
            });
          });
        });
      }

      const activeProgram = await ctx.prisma.activeProgram.create({
        data: {
          title: program.title,
          programSchema: program.schema || [],
          schema: template,
          summary: program.description,
          numberOfDays: template.length,
          currentWorkout: template[0],
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
      const program = await ctx.prisma.activeProgram.findFirst({
        where: {
          id: input.id,
        },
        include: {
          program: true,
        },
      });

      return program;
    },
  });
