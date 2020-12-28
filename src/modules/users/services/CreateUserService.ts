import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import ISchema from '@modules/users/providers/SchemaValidationProvider/shared/models/ISchema';

import { classToClass } from 'class-transformer';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CreateUserSchema')
    private createUserSchema: ISchema,
  ) {}

  public async execute(data: ICreateUserDTO): Promise<User> {
    /** Avalia formato dos dados */
    const validData = await this.createUserSchema.isValid(data);

    if (!validData) {
      throw new AppError('Dados informados não são válidos.');
    }

    /** Aplica regras de negócio */
    const userExists = await this.usersRepository.findByEmail(data.email);

    if (userExists) {
      throw new AppError('Email já está sendo utilizado por outro usuário');
    }

    /** Executa service */
    const user = await this.usersRepository.create(data);

    /** Retorna resultado */
    return classToClass(user);
  }
}

export default CreateUserService;
