/* eslint-disable no-new */
import { createProgramScehma } from 'src/schema/program.schema';
import { createProtectedRouter } from './protected-router';

export const programRouter = createProtectedRouter().mutation('create-program', {
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
});
