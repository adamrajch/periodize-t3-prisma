/* eslint-disable no-new */
import * as trpc from '@trpc/server';
import { createExerciseScehma } from 'src/schema/lift.schema';
import { createRouter } from './context';

export const liftRouter = createRouter().mutation('create-exercise', {
  input: createExerciseScehma,
  async resolve({ ctx, input }) {
    if (!ctx.session?.user) {
      new trpc.TRPCError({
        code: 'FORBIDDEN',
        message: 'Can not create a lift while logged out',
      });
    }

    const exercise = await ctx.prisma.exercise.create({
      data: {
        ...input,
      },
    });

    return exercise;
  },
});
