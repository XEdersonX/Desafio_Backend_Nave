import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import Vacancy from '../../models/Vacancy';

interface Request {
  id: string;
}

class DeleteVacanciesService {
  public async execute({ id }: Request): Promise<string> {
    const vacanciesRepository = getRepository(Vacancy);

    const vacancy = await vacanciesRepository.findOne(id);

    if (!vacancy) {
      throw new AppError('Vacancy not found.');
    }

    await vacanciesRepository.delete(vacancy.id);

    return 'Deleted vacancy.';
  }
}

export default DeleteVacanciesService;
