import { TRPCError } from '@trpc/server';
import { createRouter } from './context';

export const authRouter = createRouter()
  .query('getSession', {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
      ctx: {
        ...ctx,
        // infers that `session` is non-nullable to downstream resolvers
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  })
  .query('getUser', {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findFirst({
        where: { id: ctx.user?.id },
        include: {
          programs: true,
          activePrograms: true,
        },
      });
    },
  });
