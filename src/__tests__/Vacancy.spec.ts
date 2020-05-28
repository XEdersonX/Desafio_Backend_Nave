import request from 'supertest';
import { Connection, getRepository, getConnection } from 'typeorm';
import createConnection from '../database';

import Vacancy from '../models/Vacancy';

import app from '../app';

let connection: Connection;

let rootJwtToken = '';

describe('Vacancy', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');
    await connection.runMigrations();

    await connection.query('DELETE FROM vacancies');
    await connection.query('DELETE FROM users');
  });

  beforeEach(async () => {
    await request(app).post('/users').send({
      name: 'Teste 11 Token',
      email: 'testetoken11@gmail.com',
      password: '1234781',
    });

    const response = await request(app).post('/sessions').send({
      email: 'testetoken11@gmail.com',
      password: '1234781',
    });

    rootJwtToken = `Bearer ${response.body.token}`;
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to list vacancy', async () => {
    await request(app)
      .post('/vacancies')
      .set('Authorization', rootJwtToken)
      .send({
        title: 'Backend Teste',
        description: 'Node e Postgresql',
      });

    await request(app)
      .post('/vacancies')
      .set('Authorization', rootJwtToken)
      .send({
        title: 'Frontend Teste',
        description: 'React',
      });

    await request(app)
      .post('/vacancies')
      .set('Authorization', rootJwtToken)
      .send({
        title: 'Vendedor Teste',
        description: 'teste 123',
      });

    const response = await request(app).get('/vacancies');

    expect(response.body).toHaveLength(3);
  });

  it('should be able to create new vacancy', async () => {
    const vacanciesRepository = getRepository(Vacancy);

    const response = await request(app)
      .post('/vacancies')
      .set('Authorization', rootJwtToken)
      .send({
        title: 'Teste 34 Teste',
        description: 'teste 123467',
      });

    const vacancy = await vacanciesRepository.findOne({
      where: {
        title: 'Teste 34 Teste',
      },
    });

    expect(vacancy).toBeTruthy();

    expect(response.body).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
      }),
    );
  });

  it('should be able to update vacancy', async () => {
    const vacancy = await request(app)
      .post('/vacancies')
      .set('Authorization', rootJwtToken)
      .send({
        title: 'Tester de Sistema',
        description: 'teste 12346799999',
      });

    const response = await request(app)
      .put(`/vacancies/${vacancy.body.id}`)
      .set('Authorization', rootJwtToken)
      .send({
        title: 'Tester de Software',
        description: 'Saber executar rotainas de teste',
      });

    expect(response.body).toMatchObject({
      title: 'Tester de Software',
      description: 'Saber executar rotainas de teste',
    });
  });

  it('should be able to delete vacancy', async () => {
    const vacanciesRepository = getRepository(Vacancy);

    const response = await request(app)
      .post('/vacancies')
      .set('Authorization', rootJwtToken)
      .send({
        title: 'Finaceiro',
        description: 'Ter experiencia proficional.',
      });

    await request(app)
      .delete(`/vacancies/${response.body.id}`)
      .set('Authorization', rootJwtToken);

    const vacancy = await vacanciesRepository.findOne(response.body.id);

    expect(vacancy).toBeFalsy();
  });

  it('you should not create vacancy with title that already exist', async () => {
    await request(app)
      .post('/vacancies')
      .set('Authorization', rootJwtToken)
      .send({
        title: 'Faxineira',
        description: 'Ter experiencia proficional.',
      });

    const response = await request(app)
      .post('/vacancies')
      .set('Authorization', rootJwtToken)
      .send({
        title: 'Faxineira',
        description: 'Ter experiencia proficional.',
      });

    expect(response.body).toMatchObject(
      expect.objectContaining({
        message: 'Title already used.',
      }),
    );
  });
});
