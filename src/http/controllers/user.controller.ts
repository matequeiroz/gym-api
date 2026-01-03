import type { FastifyReply, FastifyRequest } from 'fastify';

import { registerSchema } from '@/config/schemas/register.schema.ts';
import { ServiceFactory } from '@/factories/service.factory.ts';

const register = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { name, email, password } = registerSchema.parse(request.body);

    const userService = ServiceFactory.createUserService();
    await userService.register({ name, email, password });

    return reply.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    if (error instanceof Error && error.message === 'User already exists') {
      return reply.status(409).send({ error: 'User already exists' });
    }

    throw error;
  }
};

export const userController = {
  register,
};
