import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

@injectable()
class CreateUserService {
  constructor(private UsersRepository: IUsersRepository) {}

  public async execute({ name, email }: ICreateUserDTO): Promise<User> {
    // TODO
  }
}

export default CreateUserService;
