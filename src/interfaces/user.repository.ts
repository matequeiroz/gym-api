import type { User } from '@prisma/client';

export type UserData = {
  name: string;
  email: string;
  passwordHash: string;
};

export type UserRepositoryType = {
  create(userData: UserData): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
};
