import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import Vacancy from '../../models/Vacancy';

interface Request {
  title: string;
  description: string;
}

class CreateVacanciesService {
  public async execute({ title, description }: Request): Promise<Vacancy> {
    const vacanciesRepository = getRepository(Vacancy);

    const checkCVacanciesTitleExists = await vacanciesRepository.findOne({
      where: { title },
    });

    if (checkCVacanciesTitleExists) {
      throw new AppError('Title already used.');
    }

    const vacancy = vacanciesRepository.create({
      title,
      description,
    });

    await vacanciesRepository.save(vacancy);

    return vacancy;
  }
}

export default CreateVacanciesService;
