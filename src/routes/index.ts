import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import candidateRouter from './candidate.routes';
import vacanciesRouter from './vacancies.routes';
import commentsApplicationsRouter from './commentsApplications.routes';
import applicationsRouter from './applications.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/candidate', candidateRouter);
routes.use('/vacancies', vacanciesRouter);
routes.use('/applications', applicationsRouter);
routes.use('/commentsApplications', commentsApplicationsRouter);

export default routes;
