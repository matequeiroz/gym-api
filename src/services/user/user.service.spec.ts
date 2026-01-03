import { describe, expect, test } from 'vitest';
import { UserService, type RegisterType } from './user.service.ts';
import { InMemoryUserRepository } from '@/repositories/user/user.inmemory.repository.ts';
import bcrypt from 'bcryptjs';

describe('UserService', () => {
  const user: RegisterType = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  };

  test('should be able to register a user', async () => {
    const userRepository = new InMemoryUserRepository();
    const userService = new UserService(userRepository);

    const userCreated = await userService.register(user);

    expect(userCreated.id).toBeDefined();
    expect(typeof userCreated.id).toBe('string');
    expect(userCreated).toBeDefined();
    expect(userCreated.name).toBe(user.name);
    expect(userCreated.email).toBe(user.email);
    expect(userCreated.password_hash).toBeDefined();
    expect(userCreated.createdAt).toBeDefined();
    expect(userCreated.updatedAt).toBeDefined();
  });

  test('should not be able to register with same email twice', async () => {
    const userRepository = new InMemoryUserRepository();
    const userService = new UserService(userRepository);

    await userService.register(user);

    await expect(() => userService.register(user)).rejects.toThrow(
      'User already exists'
    );
  });

  test('should be able to find a user by email', async () => {
    const userRepository = new InMemoryUserRepository();
    const userService = new UserService(userRepository);

    const userCreated = await userService.register(user);
    const userFound = await userService.findByEmail(user.email);

    expect(userFound).toBeDefined();
    expect(userFound?.id).toBe(userCreated.id);
    expect(userFound?.name).toBe(user.name);
    expect(userFound?.email).toBe(user.email);
  });

  test('should be create hash password', async () => {
    const userRepository = new InMemoryUserRepository();
    const userService = new UserService(userRepository);

    const userCreated = await userService.register(user);

    const isHashValid = await bcrypt.compare(
      user.password,
      userCreated.password_hash
    );

    expect(userCreated.password_hash).toBeDefined();
    expect(isHashValid).toBe(true);
  });
});
