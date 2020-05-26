import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import Application from '../../models/Application';
import Vacancy from '../../models/Vacancy';
import Candidate from '../../models/Candidate';

interface Request {
  id_candidate: string;
  id_vacancies: string;
}

class CreateApplications {
  public async execute({
    id_candidate,
    id_vacancies,
  }: Request): Promise<Application> {
    const applicationsRepository = getRepository(Application);
    const candidateRepository = getRepository(Candidate);
    const vacanciesRepository = getRepository(Vacancy);

    const checkCandidateExists = await candidateRepository.findOne({
      id: id_candidate,
    });

    if (!checkCandidateExists) {
      throw new AppError('Candidate not found.');
    }

    const checkVacanciesExists = await vacanciesRepository.findOne({
      id: id_vacancies,
    });

    if (!checkVacanciesExists) {
      throw new AppError('Vacancy not found.');
    }

    const checkCandidateAlreadyApplied = await applicationsRepository.findOne({
      where: { id_candidate, id_vacancies },
    });

    if (checkCandidateAlreadyApplied) {
      throw new AppError('You already applied to this vacancy.');
    }

    const application = applicationsRepository.create({
      id_candidate,
      id_vacancies,
    });

    await applicationsRepository.save(application);

    return application;
  }
}

export default CreateApplications;
