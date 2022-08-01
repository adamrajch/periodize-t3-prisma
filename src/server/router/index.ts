// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';
import { exampleRouter } from './example';
import { authRouter } from './auth';
import { liftRouter } from './lift';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('lift.', liftRouter)
  .merge('auth.', authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
