/* eslint-disable  */
import type { UserRepositoryType } from '@/interfaces/user.repository.ts';
import * as bcryptjs from 'bcryptjs';

type RegisterType = {
  name: string;
  email: string;
  password: string;
};

export class UserService {
  private userRepository: UserRepositoryType;

  constructor(userRepository: UserRepositoryType) {
    this.userRepository = userRepository;
  }

  async register({ name, email, password }: RegisterType) {
    const isUserAlreadyRegister = await this.userRepository.findByEmail({
      email,
    });

    if (isUserAlreadyRegister) {
      throw new Error('User already exists');
    }

    const password_hash = await bcryptjs.hash(password, 5);

    await this.userRepository.create({
      name,
      email,
      passwordHash: password_hash,
    });
  }
}
