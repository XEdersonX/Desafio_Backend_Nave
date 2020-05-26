import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import CommentsApplications from '../../models/CommentsApplication';
import Application from '../../models/Application';
import User from '../../models/User';

interface Request {
  id_application: string;
  description: string;
  id_user: string;
}

class CreateCommentsApplications {
  public async execute({
    id_application,
    description,
    id_user,
  }: Request): Promise<CommentsApplications> {
    const commentsApplicationsRepository = getRepository(CommentsApplications);
    const applicationsRepository = getRepository(Application);
    const usersRepository = getRepository(User);

    const checkApplicationsExists = await applicationsRepository.findOne({
      id: id_application,
    });

    if (!checkApplicationsExists) {
      throw new AppError('Applicaton not found.');
    }

    const checkUserExists = await usersRepository.findOne({ id: id_user });

    if (!checkUserExists) {
      throw new AppError('User not found.');
    }

    const commentApplication = commentsApplicationsRepository.create({
      id_application,
      description,
      id_user,
    });

    await commentsApplicationsRepository.save(commentApplication);

    return commentApplication;
  }
}

export default CreateCommentsApplications;
