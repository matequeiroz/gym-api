/* eslint-disable no-useless-catch */
import type { FastifyReply, FastifyRequest } from 'fastify';

import { registerSchema } from '@/config/schemas/register.schema.ts';
import { UserService } from '@/services/user/user.service.ts';
import { UserRepository } from '@/repositories/user/user.repository.ts';

const register = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { name, email, password } = registerSchema.parse(request.body);

    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    await userService.register({ name, email, password });

    return reply.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    if ((error as Error).message === 'User already exists') {
      return reply.status(409).send({ error: 'User already exists' });
    }

    throw error;
  }
};

export const userController = {
  register,
};
