/* eslint-disable no-new */
import { createLiftScehma } from 'src/schema/lift.schema';
import { createRouter } from './context';
import * as trpc from '@trpc/server';

export const liftRouter = createRouter().mutation('create-lift', {
  input: createLiftScehma,
  async resolve({ ctx, input }) {
    if (!ctx.session?.user) {
      new trpc.TRPCError({
        code: 'FORBIDDEN',
        message: 'Can not create a lift while logged out',
      });
    }

    const post = await ctx.prisma.lift.create({
      data: {
        ...input,
        default: false,
        user: {
          create: [
            {
              user: {
                connect: {
                  id: ctx.session?.user.id,
                },
              },
            },
          ],
        },
      },
    });

    return post;
  },
});
