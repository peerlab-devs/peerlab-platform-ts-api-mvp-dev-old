import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

/** Registra mesma instância de repositório quando algum serviço chamar o id registrado entre aspas */
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
