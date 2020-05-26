import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import CommentsApplications from '../../models/CommentsApplication';

interface Request {
  id: string;
}

class DeleteCommentsApplicationsService {
  public async execute({ id }: Request): Promise<string> {
    const commentsApplicationsRepository = getRepository(CommentsApplications);

    const commentsApplications = await commentsApplicationsRepository.findOne(
      id,
    );

    if (!commentsApplications) {
      throw new AppError('Comment not found.');
    }

    await commentsApplicationsRepository.delete(commentsApplications.id);

    return 'Deleted comment.';
  }
}

export default DeleteCommentsApplicationsService;
