import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import Application from '../../models/Application';

interface Request {
  id: string;
}

class DeleteApplicationsService {
  public async execute({ id }: Request): Promise<string> {
    const applicationsRepository = getRepository(Application);

    const application = await applicationsRepository.findOne(id);

    if (!application) {
      throw new AppError('Application not found.');
    }

    await applicationsRepository.delete(application.id);

    return 'Deleted application.';
  }
}

export default DeleteApplicationsService;
