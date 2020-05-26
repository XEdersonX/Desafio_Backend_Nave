import { Router } from 'express';
import { getRepository } from 'typeorm';

import Vacancy from '../models/Vacancy';

import CreateVacanciesService from '../services/vacancies/CreateVacanciesService';
import UpdateVacanciesService from '../services/vacancies/UpdateVacanciesService';
import DeleteVacanciesService from '../services/vacancies/DeleteVacanciesService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const vacanciesRouter = Router();

vacanciesRouter.get('/', async (request, response) => {
  const vacanciesRepository = getRepository(Vacancy);

  const vacancy = await vacanciesRepository.find();

  return response.json(vacancy);
});

vacanciesRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { title, description } = request.body;

  const createVacancies = new CreateVacanciesService();

  const vacancy = await createVacancies.execute({
    title,
    description,
  });

  return response.json(vacancy);
});

vacanciesRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const { title, description } = request.body;

  const updateVacancies = new UpdateVacanciesService();

  const vacancy = await updateVacancies.execute({
    id,
    title,
    description,
  });

  return response.json(vacancy);
});

vacanciesRouter.delete(
  '/:id',
  ensureAuthenticated,
  async (request, response) => {
    const { id } = request.params;

    const deleteVacancies = new DeleteVacanciesService();

    const message = await deleteVacancies.execute({ id });

    return response.json({ message });
  },
);

export default vacanciesRouter;
