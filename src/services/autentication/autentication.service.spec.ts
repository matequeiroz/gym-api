import { beforeAll, describe, expect, test } from 'vitest';
import bcrypt from 'bcryptjs';

import { InMemoryUserRepository } from '@/repositories/user/user.inmemory.repository.ts';
import { AuthenticationService } from '@/services/autentication/autentication.service.ts';

describe('AuthenticationService', () => {
  const autenticationRequest = {
    email: 'john@example.com',
    password: 'password123',
  };

  let userRepository: InMemoryUserRepository;
  let authService: AuthenticationService;

  beforeAll(() => {
    userRepository = new InMemoryUserRepository();
    authService = new AuthenticationService(userRepository);
  });

  test('should authenticate a user with correct credentials', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      passwordHash: await bcrypt.hash('password123', 6),
    });

    const result = await authService.authenticate(autenticationRequest);

    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.id).toEqual(expect.any(String));
    expect(result.name).toBe('John Doe');
    expect(result.email).toBe('john@example.com');
  });

  test('should not authenticate a user with incorrect credentials', async () => {
    await expect(() =>
      authService.authenticate({
        email: 'john@example.com',
        password: 'wrongpassword',
      })
    ).rejects.toThrow('Credentials invalid');
  });

  test('should not authenticate a user that does not exist', async () => {
    await expect(() =>
      authService.authenticate({
        email: 'nonexistent@example.com',
        password: 'password123',
      })
    ).rejects.toThrow('Credentials invalid');
  });
});
