import { AuthenticationService } from '@/services/autentication/autentication.service.ts';
import { UserService } from '@/services/user/user.service.ts';
import { RepositoryFactory } from '@/factories/repository.factory.ts';

export class ServiceFactory {
  static createAuthenticationService(): AuthenticationService {
    const userRepository = RepositoryFactory.createUserRepository();
    return new AuthenticationService(userRepository);
  }

  static createUserService(): UserService {
    const userRepository = RepositoryFactory.createUserRepository();
    return new UserService(userRepository);
  }
}
