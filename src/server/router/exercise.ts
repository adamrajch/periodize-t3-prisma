/* eslint-disable no-new */
import * as trpc from '@trpc/server';
import { createExerciseScehma } from 'src/schema/exercise.schema';
import { InputIdSchema, InputStringSchema } from 'src/schema/general.schema';
import { z } from 'zod';
import { createProtectedRouter } from './protected-router';

export const exerciseRouter = createProtectedRouter()
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
    async resolve({ ctx }) {
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
  .query('getPaginatedExercises', {
    input: z.object({
      limit: z.number().min(1).max(5).nullish(),
      cursor: z.any(), // <-- "cursor" needs to exist, but can be any type
    }),
    async resolve({ ctx, input }) {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const exercises = await ctx.prisma.exercise.findMany({
        take: limit + 1,
        orderBy: [
          {
            name: 'asc',
          },
        ],
        cursor: cursor || undefined,
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
      });

      let nextCursor: typeof cursor | undefined;
      if (exercises.length > limit) {
        const nextItem = exercises.pop();
        nextCursor = nextItem!.name;
      }

      return {
        exercises,
        nextCursor,
      };
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
