import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ICreateUserSchema from '@modules/users/providers/ValidationProvider/models/ICreateUserSchema';
import YupCreateUserSchema from '@modules/users/providers/ValidationProvider/implementations/YupCreateUserSchema';

/** Registra mesma instância de repositório quando algum serviço chamar o id registrado entre aspas */
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICreateUserSchema>(
  'CreateUserSchema',
  YupCreateUserSchema,
);
