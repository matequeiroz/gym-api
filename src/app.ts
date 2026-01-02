import fastify from 'fastify';

import { appRoutes } from '@/http/routes/index.ts';

export const app = fastify();

app.register(appRoutes);
