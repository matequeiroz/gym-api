import type { FastifyInstance } from 'fastify';

import { userController } from '@/http/controllers/user.controller.ts';
import { prisma } from '@/lib/prisma.ts';

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/user/register', userController.register);
  app.get('/users', async (request, reply) => {
    const users = await prisma.user.findMany();
    return reply.status(200).send(users);
  });
};
