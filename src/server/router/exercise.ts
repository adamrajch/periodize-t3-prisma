/* eslint-disable no-new */
import * as trpc from '@trpc/server';
import { InputIdSchema, InputStringSchema } from 'src/schema/general.schema';
import { createExerciseScehma } from 'src/schema/lift.schema';
import { createRouter } from './context';

export const exerciseRouter = createRouter()
  .mutation('create-exercise', {
    input: createExerciseScehma,
    async resolve({ ctx, input }) {
      if (!ctx.session?.user) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: 'Can not create a lift while logged out',
        });
      }

      const exercise = await ctx.prisma.user.update({
        where: {
          id: ctx.userId,
        },
        data: {
          exercises: {
            create: {
              ...input,
            },
          },
        },
        include: {
          exercises: true,
        },
      });

      return exercise;
    },
  })
  .query('getExercises', {
    async resolve({ ctx, input }) {
      const exercises = await ctx.prisma.exercise.findMany({
        orderBy: [
          {
            name: 'asc',
          },
        ],
        where: {
          OR: [
            {
              userId: {
                equals: ctx.userId,
              },
            },
            {
              user: {
                role: {
                  equals: 'ADMIN',
                },
              },
            },
          ],
        },
        include: {
          user: true,
        },
      });

      return exercises;
    },
  })
  .query('searchExercises', {
    input: InputStringSchema,
    async resolve({ ctx, input }) {
      const exercises = await ctx.prisma.exercise.findMany({
        orderBy: {
          name: 'asc',
        },
        where: {
          name: {
            contains: input.name,
          },
        },
        take: 5,
      });

      return exercises;
    },
  })
  .mutation('delete-exercise', {
    input: InputIdSchema,
    async resolve({ ctx, input }) {
      if (!ctx.session?.user) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: 'Can not create a lift while logged out',
        });
      }
      const exercise = await ctx.prisma.exercise.delete({
        where: {
          id: input.id,
        },
      });
      return exercise;
    },
  });
