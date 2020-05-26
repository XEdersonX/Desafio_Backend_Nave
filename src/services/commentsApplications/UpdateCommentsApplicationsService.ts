import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import CommentsApplications from '../../models/CommentsApplication';
import User from '../../models/User';

interface Request {
  id: string;
  description: string;
  id_user: string;
}

class UpdateCommentsApplicationsService {
  public async execute({
    id,
    description,
    id_user,
  }: Request): Promise<CommentsApplications> {
    const commentsApplicationsRepository = getRepository(CommentsApplications);
    const usersRepository = getRepository(User);

    const commentsApplications = await commentsApplicationsRepository.findOne(
      id,
    );

    if (!commentsApplications) {
      throw new AppError('Comment not found.');
    }

    const checkUserExists = await usersRepository.findOne({ id: id_user });

    if (!checkUserExists) {
      throw new AppError('User not found.');
    }

    commentsApplications.description = description;
    commentsApplications.id_user = id_user;

    await commentsApplicationsRepository.save(commentsApplications);

    return commentsApplications;
  }
}

export default UpdateCommentsApplicationsService;
