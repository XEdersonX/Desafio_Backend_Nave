import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import Candidate from '../../models/Candidate';

interface Request {
  name: string;
  email: string;
  fone: string;
  cpf: string;
}

class CreateCandidateService {
  public async execute({
    name,
    email,
    fone,
    cpf,
  }: Request): Promise<Candidate> {
    const candidateRepository = getRepository(Candidate);

    // Verifica por email.
    const checkCandidateEmailExists = await candidateRepository.findOne({
      where: { email },
    });

    if (checkCandidateEmailExists) {
      throw new AppError('Email address already used.');
    }

    // Verifica por cpf.
    const checkCandidateCpfExists = await candidateRepository.findOne({
      where: { cpf },
    });

    if (checkCandidateCpfExists) {
      throw new AppError('Cpf already used.');
    }

    const candidate = candidateRepository.create({
      name,
      email,
      fone,
      cpf,
    });

    await candidateRepository.save(candidate);

    return candidate;
  }
}

export default CreateCandidateService;
