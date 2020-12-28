import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';

import { container } from 'tsyringe';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, surname, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      surname,
      email,
      password,
    });

    return response.status(200).json(user);
  }
}
