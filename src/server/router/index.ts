// src/server/router/index.ts
import superjson from 'superjson';
import { activeProgramRouter } from './activeProgram';
import { authRouter } from './auth';
import { createRouter } from './context';
import { exerciseRouter } from './exercise';
import { programRouter } from './program';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('auth.', authRouter)
  .merge('program.', programRouter)
  .merge('activeProgram.', activeProgramRouter)
  .merge('exercise.', exerciseRouter);
// export type definition of API
export type AppRouter = typeof appRouter;
