import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import User from '../../models/User';

interface Request {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: Request): Promise<string> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    await usersRepository.delete(user.id);

    return 'Deleted user.';
  }
}

export default DeleteUserService;
