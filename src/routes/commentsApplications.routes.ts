import { Router } from 'express';

import ListCommentsApplicationsService from '../services/commentsApplications/ListCommentsApplicationsService';
import CreateCommentsApplicationsService from '../services/commentsApplications/CreateCommentsApplicationsService';
import UpdateCommentsApplicationsService from '../services/commentsApplications/UpdateCommentsApplicationsService';
import DeleteCommentsApplicationsService from '../services/commentsApplications/DeleteCommentsApplicationsService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const commentsApplicationsRouter = Router();

// Middeware
commentsApplicationsRouter.use(ensureAuthenticated);

commentsApplicationsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const listCommentsApplications = new ListCommentsApplicationsService();

  const commentApplication = await listCommentsApplications.execute({
    id_application: id,
  });

  return response.json(commentApplication);
});

commentsApplicationsRouter.post('/', async (request, response) => {
  const { id_application, description, id_user } = request.body;

  const createCommentsApplications = new CreateCommentsApplicationsService();

  const commentApplication = await createCommentsApplications.execute({
    id_application,
    description,
    id_user,
  });

  return response.json(commentApplication);
});

commentsApplicationsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { description, id_user } = request.body;

  const updateCommentsApplications = new UpdateCommentsApplicationsService();

  const commentApplication = await updateCommentsApplications.execute({
    id,
    description,
    id_user,
  });

  return response.json(commentApplication);
});

commentsApplicationsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteCommentsApplications = new DeleteCommentsApplicationsService();

  const message = await deleteCommentsApplications.execute({ id });

  return response.json({ message });
});

export default commentsApplicationsRouter;
