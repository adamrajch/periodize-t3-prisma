/* eslint-disable no-new */

import { IdInput } from 'src/schema/activeProgram.schema';
import { CreateProgramWorkoutInput } from 'src/schema/workout.schema';
import { createProtectedRouter } from './protected-router';

export const workoutRouter = createProtectedRouter()
  .mutation('createWorkout', {
    input: CreateProgramWorkoutInput,
    async resolve({ ctx, input }) {
      // create workout and link to user, create records and link to workout and user and program

      const workout = await ctx.prisma.workout.create({
        data: {
          schema: input.workout,
          performedAt: input.workout.performedAt,
          // records: {
          //   createMany: {
          //     data: [...input.workout.exercises],
          //   },
          // },
          user: {
            connect: {
              id: ctx.userId,
            },
          },
          program: {
            connect: {
              id: input.programId,
            },
          },
        },
      });

      input.workout.exercises.map(async (w) => {
        const record = await ctx.prisma.record.create({
          data: {
            name: w.name,
            exerciseId: w.exerciseId,
            sets: w.sets,
            reps: w.reps,
            rpe: w.rpe,
            percentage: w.percentage,
            time: w.time,
            weight: w.weight ? w.weight : undefined,
            distance: w.distance ? w.distance : undefined,
            user: {
              connect: {
                id: ctx.userId,
              },
            },
            program: {
              connect: {
                id: input.programId,
              },
            },
            workout: {
              connect: {
                id: workout.id,
              },
            },
          },
        });

        return record;
      });
    },
  })
  .mutation('deleteWorkout', {
    input: IdInput,
    async resolve({ ctx, input }) {
      const workout = await ctx.prisma.workout.delete({
        where: {
          id: input.id,
        },
      });

      return workout;
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
