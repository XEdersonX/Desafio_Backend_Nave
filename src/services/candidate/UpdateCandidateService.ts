import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import Candidate from '../../models/Candidate';

interface Request {
  id: string;
  name: string;
  email: string;
  fone: string;
  cpf: string;
}

class UpdateCandidateService {
  public async execute({
    id,
    name,
    email,
    fone,
    cpf,
  }: Request): Promise<Candidate> {
    const candidateRepository = getRepository(Candidate);

    const candidate = await candidateRepository.findOne(id);

    if (!candidate) {
      throw new AppError('Candidate not found.');
    }

    // Verifica por email.
    const checkCandidateEmailExists = await candidateRepository.findOne({
      where: { email },
    });

    if (checkCandidateEmailExists && candidate.email !== email) {
      throw new AppError('Email address already used.');
    }

    // Verifica por cpf.
    const checkCandidateCpfExists = await candidateRepository.findOne({
      where: { cpf },
    });

    if (checkCandidateCpfExists && candidate.cpf !== cpf) {
      throw new AppError('Cpf already used.');
    }

    candidate.name = name;
    candidate.email = email;
    candidate.fone = fone;
    candidate.cpf = cpf;

    await candidateRepository.save(candidate);

    return candidate;
  }
}

export default UpdateCandidateService;
