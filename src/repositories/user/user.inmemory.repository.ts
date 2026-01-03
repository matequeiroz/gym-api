import { prisma } from '@/lib/prisma.ts';
import type { UserRepositoryType } from '@/interfaces/user.repository.ts';
import type { UserData } from '@/interfaces/user.repository.ts';
import type { User } from '@prisma/client';

export class InMemoryUserRepository implements UserRepositoryType {
  public users: User[] = [];

  async create(userData: UserData) {
    const user: User = {
      id: Math.random().toString(36).substring(2, 9),
      name: userData.name,
      email: userData.email,
      password_hash: userData.passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email) || null;
    return user;
  }
}
