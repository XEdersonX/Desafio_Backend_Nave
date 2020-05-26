import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import CommentsApplications from '../../models/CommentsApplication';
import Application from '../../models/Application';

interface Request {
  id_application: string;
}

class ListCommentsApplications {
  public async execute({
    id_application,
  }: Request): Promise<CommentsApplications[]> {
    const commentsApplicationsRepository = getRepository(CommentsApplications);
    const applicationsRepository = getRepository(Application);

    const checkApplicationsExists = await applicationsRepository.findOne({
      id: id_application,
    });

    if (!checkApplicationsExists) {
      throw new AppError('Applicaton not found.');
    }

    const commentApplication = await commentsApplicationsRepository.find({
      where: { id_application },
    });

    return commentApplication;
  }
}

export default ListCommentsApplications;
