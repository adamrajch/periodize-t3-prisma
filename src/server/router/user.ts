/* eslint-disable no-new */
import * as trpc from '@trpc/server';
import { createProgramScehma } from 'src/schema/program.schema';
import { createRouter } from './context';

export const userRouter = createRouter().mutation('create-program', {
  input: createProgramScehma,
  async resolve({ ctx, input }) {
    if (!ctx.session?.user || !ctx.userId) {
      return new trpc.TRPCError({
        code: 'FORBIDDEN',
        message: 'Can not create a lift while logged out',
      });
    }

    const program = await ctx.prisma.program.create({
      data: {
        ...input,
      },
      user: {
        connect: {
          id: ctx.user?.id,
        },
      },
    });

    return program;
  },
});
