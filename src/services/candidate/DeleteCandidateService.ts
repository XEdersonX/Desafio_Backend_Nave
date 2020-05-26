import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import Candidate from '../../models/Candidate';

interface Request {
  id: string;
}

class DeleteCandidateService {
  public async execute({ id }: Request): Promise<string> {
    const candidateRepository = getRepository(Candidate);

    const candidate = await candidateRepository.findOne(id);

    if (!candidate) {
      throw new AppError('Candidate not found.');
    }

    await candidateRepository.delete(candidate.id);

    return 'Deleted candidate.';
  }
}

export default DeleteCandidateService;
