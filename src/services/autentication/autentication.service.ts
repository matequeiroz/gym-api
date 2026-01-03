import type { UserRepositoryType } from '@/interfaces/user.repository.ts';
import type { User } from '@prisma/client';
import bcrypt from 'bcryptjs';

type AuthenticateDataRequest = {
  email: string;
  password: string;
};

export class AuthenticationService {
  private userRepository: UserRepositoryType;

  constructor(userRepository: UserRepositoryType) {
    this.userRepository = userRepository;
  }

  async authenticate({
    email,
    password,
  }: AuthenticateDataRequest): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Credentials invalid');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new Error('Credentials invalid');
    }

    return user;
  }
}
