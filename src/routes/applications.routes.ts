import { Router } from 'express';
import { getRepository } from 'typeorm';

import Application from '../models/Application';

import CreateApplicationsService from '../services/applications/CreateApplicationsService';
import DeleteApplicationsService from '../services/applications/DeleteApplicationsService';

const applicationsRouter = Router();

applicationsRouter.get('/', async (request, response) => {
  const applicationsRepository = getRepository(Application);

  const applications = await applicationsRepository.find();

  return response.json(applications);
});

applicationsRouter.post('/', async (request, response) => {
  const { id_candidate, id_vacancies } = request.body;

  const createApplications = new CreateApplicationsService();

  const applications = await createApplications.execute({
    id_candidate,
    id_vacancies,
  });

  return response.json(applications);
});

applicationsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteApplications = new DeleteApplicationsService();

  const message = await deleteApplications.execute({ id });

  return response.json({ message });
});

export default applicationsRouter;
