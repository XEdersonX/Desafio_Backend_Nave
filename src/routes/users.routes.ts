import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

import CreateUserService from '../services/users/CreateUserService';
import UpdateUserService from '../services/users/UpdateUserService';
import DeleteUserService from '../services/users/DeleteUserService';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(User);

  const users = await usersRepository.find();

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, email, password } = request.body;

  const updateUser = new UpdateUserService();

  const user = await updateUser.execute({
    id,
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteUser = new DeleteUserService();

  const message = await deleteUser.execute({ id });

  return response.json({ message });
});

export default usersRouter;
