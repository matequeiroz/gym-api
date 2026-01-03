import type { UserRepositoryType } from '@/interfaces/user.repository.ts';
import type { User } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';

export type RegisterType = {
  name: string;
  email: string;
  password: string;
};

export class UserService {
  private userRepository: UserRepositoryType;

  constructor(userRepository: UserRepositoryType) {
    this.userRepository = userRepository;
  }

  async register({ name, email, password }: RegisterType): Promise<User> {
    const isUserAlreadyRegister = await this.userRepository.findByEmail(email);

    if (isUserAlreadyRegister) {
      throw new Error('User already exists');
    }

    const password_hash = await bcryptjs.hash(password, 6);

    const user = await this.userRepository.create({
      name,
      email,
      passwordHash: password_hash,
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
