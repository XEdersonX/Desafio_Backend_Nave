import request from 'supertest';
import { Connection, getRepository, getConnection } from 'typeorm';
import createConnection from '../database';

import User from '../models/User';

import app from '../app';

let connection: Connection;

describe('User', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');
    await connection.runMigrations();

    await connection.query('DELETE FROM users');
  });

  beforeEach(async () => {
    // await connection.query('DELETE FROM users');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to list User', async () => {
    await connection.query('DELETE FROM users');

    await request(app).post('/users').send({
      name: 'Marcos Teste',
      email: 'marcos@gmail.com',
      password: '123456',
    });

    await request(app).post('/users').send({
      name: 'Leticia Teste',
      email: 'leticia@gmail.com',
      password: '123459',
    });

    await request(app).post('/users').send({
      name: 'Miguel Teste',
      email: 'miguel@gmail.com',
      password: '123478',
    });

    const response = await request(app).get('/users');

    expect(response.body).toHaveLength(3);
  });

  it('should be able to create new user', async () => {
    const usersRepository = getRepository(User);

    const response = await request(app).post('/users').send({
      name: 'Patricia Teste',
      email: 'patricia@gmail.com',
      password: '1234781',
    });

    const user = await usersRepository.findOne({
      where: {
        name: 'Patricia Teste',
      },
    });

    expect(user).toBeTruthy();

    expect(response.body).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
      }),
    );
  });

  it('should be able to update user', async () => {
    const user = await request(app).post('/users').send({
      name: 'Moises Teste',
      email: 'moises@gmail.com',
      password: '12347899',
    });

    const response = await request(app).put(`/users/${user.body.id}`).send({
      name: 'Fernanda Teste',
      email: 'fernanda@gmail.com',
      password: '99999988',
    });

    expect(response.body).toMatchObject({
      name: 'Fernanda Teste',
      email: 'fernanda@gmail.com',
    });
  });

  it('should be able to delete user', async () => {
    const usersRepository = getRepository(User);

    const response = await request(app).post('/users').send({
      name: 'Fernando Teste',
      email: 'fernando@gmail.com',
      password: '1234781',
    });

    await request(app).delete(`/users/${response.body.id}`);

    const user = await usersRepository.findOne(response.body.id);

    expect(user).toBeFalsy();
  });

  it('you should not create users with email that already exist', async () => {
    await request(app).post('/users').send({
      name: 'Teste Teste',
      email: 'teste@gmail.com',
      password: '1234781',
    });

    // const response = await request(app)
    //   .post('/users')
    //   .send({
    //     name: 'Nave Teste',
    //     email: 'teste@gmail.com',
    //     password: '23434343',
    //   })
    //   .expect(400);

    const response = await request(app).post('/users').send({
      name: 'Nave Teste',
      email: 'teste@gmail.com',
      password: '23434343',
    });

    expect(response.body).toMatchObject(
      expect.objectContaining({
        message: 'Email address already used.',
      }),
    );
  });
});
