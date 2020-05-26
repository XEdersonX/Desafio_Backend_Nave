import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../../errors/AppError';

import User from '../../models/User';

interface Request {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists && user.email !== email) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
