import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import Vacancy from '../../models/Vacancy';

interface Request {
  id: string;
  title: string;
  description: string;
}

class UpdateVacanciesService {
  public async execute({ id, title, description }: Request): Promise<Vacancy> {
    const vacanciesRepository = getRepository(Vacancy);

    const vacancy = await vacanciesRepository.findOne(id);

    if (!vacancy) {
      throw new AppError('Vacancy not found.');
    }

    // Verifica por email.
    const checkVacanciesTitleExists = await vacanciesRepository.findOne({
      where: { title },
    });

    if (checkVacanciesTitleExists && vacancy.title !== title) {
      throw new AppError('Title already used.');
    }

    vacancy.title = title;
    vacancy.description = description;

    await vacanciesRepository.save(vacancy);

    return vacancy;
  }
}

export default UpdateVacanciesService;
