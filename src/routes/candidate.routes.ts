import { Router } from 'express';
import { getRepository } from 'typeorm';

import Candidate from '../models/Candidate';

import CreateCandidateService from '../services/candidate/CreateCandidateService';
import UpdateCandidateService from '../services/candidate/UpdateCandidateService';
import DeleteCandidateService from '../services/candidate/DeleteCandidateService';

const candidateRouter = Router();

candidateRouter.get('/', async (request, response) => {
  const candidateRepository = getRepository(Candidate);

  const candidate = await candidateRepository.find();

  return response.json(candidate);
});

candidateRouter.post('/', async (request, response) => {
  const { name, email, fone, cpf } = request.body;

  const createCandidate = new CreateCandidateService();

  const candidate = await createCandidate.execute({
    name,
    email,
    fone,
    cpf,
  });

  return response.json(candidate);
});

candidateRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, email, fone, cpf } = request.body;

  const updateCandidate = new UpdateCandidateService();

  const candidate = await updateCandidate.execute({
    id,
    name,
    email,
    fone,
    cpf,
  });

  return response.json(candidate);
});

candidateRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteCandidate = new DeleteCandidateService();

  const message = await deleteCandidate.execute({ id });

  return response.json({ message });
});

export default candidateRouter;
