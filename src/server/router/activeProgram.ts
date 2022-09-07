/* eslint-disable no-new */

import { ProgramIdInput } from 'src/schema/activeProgram.schema';
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
          name: program.title || 'Nani',
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
  });
