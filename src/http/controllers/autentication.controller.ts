import type { FastifyReply, FastifyRequest } from 'fastify';

import { authenticateSchema } from '@/config/schemas/autentication.schema.ts';
import { ServiceFactory } from '@/factories/service.factory.ts';

const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    console.log('Request body:', request.body);
    const parseResult = authenticateSchema.safeParse(request.body);

    if (!parseResult.success) {
      throw parseResult.error;
    }

    const { email, password } = parseResult.data;

    const authService = ServiceFactory.createAuthenticationService();
    const user = await authService.authenticate({ email, password });

    return reply.status(200).send({ user });
  } catch (error) {
    if (error instanceof Error && error.message === 'Credentials invalid') {
      return reply.status(401).send({ error: 'Invalid credentials' });
    }

    throw error;
  }
};

export const autenticationController = {
  authenticate,
};
