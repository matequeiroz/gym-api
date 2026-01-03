import { PrismaClient } from '@prisma/client';

import type { UserRepositoryType } from '@/interfaces/user.repository.ts';
import { UserRepository } from '@/repositories/user/user.repository.ts';
import { InMemoryUserRepository } from '@/repositories/user/user.inmemory.repository.ts';

export class RepositoryFactory {
  private static prisma: PrismaClient;

  static initialize(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  static createUserRepository(): UserRepositoryType {
    return new UserRepository();
  }

  static createUserRepositoryInMemory(): UserRepositoryType {
    return new InMemoryUserRepository();
  }
}
