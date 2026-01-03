import { prisma } from '@/lib/prisma.ts';
import type { UserRepositoryType } from '@/interfaces/user.repository.ts';
import type { UserData } from '@/interfaces/user.repository.ts';
import type { User } from '@prisma/client';

export class UserRepository implements UserRepositoryType {
  async create(userData: UserData) {
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password_hash: userData.passwordHash,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
