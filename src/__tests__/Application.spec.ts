import request from 'supertest';
import { Connection, getRepository, getConnection } from 'typeorm';
import createConnection from '../database';

import Application from '../models/Application';

import app from '../app';

let connection: Connection;

let rootJwtToken = '';

describe('Application', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');
    await connection.runMigrations();
  });

  beforeEach(async () => {
    // await connection.query('DELETE FROM applications');
    // await connection.query('DELETE FROM candidate');
    // await connection.query('DELETE FROM vacancies');
    // await connection.query('DELETE FROM users');

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
    // await connection.query('DELETE FROM applications');
    // await connection.query('DELETE FROM candidate');
    // await connection.query('DELETE FROM vacancies');
    await connection.query('DELETE FROM users');

    // await connection.query('DELETE FROM applications');
    // await connection.query('DELETE FROM users');
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to list application', async () => {
    const candidate1 = await request(app).post('/candidate').send({
      name: 'Rodrigo Oliveira',
      email: 'teste1@gmail.com',
      fone: '5332903297',
      cpf: '03333392090',
    });

    const vacancy1 = await request(app)
      .post('/vacancies')
      .set('Authorization', rootJwtToken)
      .send({
        title: 'Backend Teste 1',
        description: 'Node e Postgresql',
      });

    await request(app).post('/applications').send({
      id_candidate: candidate1.body.id,
      id_vacancies: vacancy1.body.id,
    });

    const candidate2 = await request(app).post('/candidate').send({
      name: 'Adriza Oliveira',
      email: 'adriza@gmail.com',
      fone: '5332903297',
      cpf: '03399999209',
    });

    const vacancy2 = await request(app)
      .post('/vacancies')
      .set('Authorization', rootJwtToken)
      .send({
        title: 'Front Teste 2',
        description: 'React',
      });

    await request(app).post('/applications').send({
      id_candidate: candidate2.body.id,
      id_vacancies: vacancy2.body.id,
    });

    const candidate3 = await request(app).post('/candidate').send({
      name: 'Herasmo Oliveira',
      email: 'herasmo@gmail.com',
      fone: '5332903297',
      cpf: '03355599209',
    });

    const vacancy3 = await request(app)
      .post('/vacancies')
      .set('Authorization', rootJwtToken)
      .send({
        title: 'Frontend Teste 3',
        description: 'React',
      });

    await request(app).post('/applications').send({
      id_candidate: candidate3.body.id,
      id_vacancies: vacancy3.body.id,
    });

    const response = await request(app).get('/applications');

    expect(response.body).toHaveLength(3);
  });

  it('should be able to create new application', async () => {
    const applicationRepository = getRepository(Application);

    const candidate1 = await request(app).post('/candidate').send({
      name: 'Rodrigo Luz',
      email: 'rodrigoluz@gmail.com',
      fone: '5332903297',
      cpf: '03331111090',
    });

    const vacancy1 = await request(app)
      .post('/vacancies')
      .set('Authorization', rootJwtToken)
      .send({
        title: 'Tester App Mobile',
        description: 'Mobile',
      });

    const response = await request(app).post('/applications').send({
      id_candidate: candidate1.body.id,
      id_vacancies: vacancy1.body.id,
    });

    const application = await applicationRepository.findOne(response.body.id);

    expect(application).toBeTruthy();

    expect(response.body).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
      }),
    );
  });

  it('should be able to delete application', async () => {
    const applicationRepository = getRepository(Application);

    const candidate = await request(app).post('/candidate').send({
      name: 'Maria Luz',
      email: 'marialuz@gmail.com',
      fone: '5332903297',
      cpf: '03032211080',
    });

    const vacancy = await request(app)
      .post('/vacancies')
      .set('Authorization', rootJwtToken)
      .send({
        title: 'Tester App Web',
        description: 'React',
      });

    const response = await request(app).post('/applications').send({
      id_candidate: candidate.body.id,
      id_vacancies: vacancy.body.id,
    });

    await request(app).delete(`/applications/${response.body.id}`);

    const application = await applicationRepository.findOne(response.body.id);

    expect(application).toBeFalsy();
  });

  it('you should not apply for a vacancy more than once.', async () => {
    const candidate = await request(app).post('/candidate').send({
      name: 'Daniel Luz',
      email: 'danielluz@gmail.com',
      fone: '5332903297',
      cpf: '04431277080',
    });

    const vacancy = await request(app)
      .post('/vacancies')
      .set('Authorization', rootJwtToken)
      .send({
        title: 'Vaga de C#',
        description: 'C#',
      });

    await request(app).post('/applications').send({
      id_candidate: candidate.body.id,
      id_vacancies: vacancy.body.id,
    });

    const response = await request(app).post('/applications').send({
      id_candidate: candidate.body.id,
      id_vacancies: vacancy.body.id,
    });

    expect(response.body).toMatchObject(
      expect.objectContaining({
        message: 'You already applied to this vacancy.',
      }),
    );
  });
});
