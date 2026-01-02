import fastify from 'fastify';

import { appRoutes } from '@/http/routes/index.ts';
import z, { ZodError } from 'zod';
import { env } from './config/schemas/env.schema.ts';

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Invalid request data',
      details: z.treeifyError(error),
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error('Unhandled error:', error);
  } else {
    // TODO: implements datadog/newrelic/sentry here
    console.error('Unhandled error (prod):', error);
  }

  return reply.status(500).send({ error: 'Internal server error' });
});
