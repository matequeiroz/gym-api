import type { FastifyInstance } from 'fastify';

import { userController } from '@/http/controllers/user.controller.ts';
import { autenticationController } from '@/http/controllers/autentication.controller.ts';

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/user/register', userController.register);
  app.post('/auth', autenticationController.authenticate);
};
