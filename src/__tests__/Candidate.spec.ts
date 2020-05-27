import request from 'supertest';
import { Connection, getRepository, getConnection } from 'typeorm';
import createConnection from '../database';

import Candidate from '../models/Candidate';

import app from '../app';

let connection: Connection;

describe('Candidate', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');
    await connection.runMigrations();

    await connection.query('DELETE FROM candidate');
  });

  beforeEach(async () => {
    // await connection.query('DELETE FROM candidate');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to list candidate', async () => {
    await request(app).post('/candidate').send({
      name: 'Felipe Silva',
      email: 'felipe@gmail.com',
      fone: '5332903297',
      cpf: '03888392090',
    });

    await request(app).post('/candidate').send({
      name: 'Maria Silva',
      email: 'maria@gmail.com',
      fone: '5332905040',
      cpf: '03888396663',
    });

    await request(app).post('/candidate').send({
      name: 'Pedro Silva',
      email: 'pedro@gmail.com',
      fone: '5332906070',
      cpf: '03881392222',
    });

    const response = await request(app).get('/candidate');

    expect(response.body).toHaveLength(3);
  });

  it('should be able to create new candidate', async () => {
    const candidateRepository = getRepository(Candidate);

    const response = await request(app).post('/candidate').send({
      name: 'Pedro Oliveira',
      email: 'pedro11@gmail.com',
      fone: '5332906070',
      cpf: '03888392011',
    });

    const candidate = await candidateRepository.findOne({
      where: {
        name: 'Pedro Oliveira',
      },
    });

    expect(candidate).toBeTruthy();

    expect(response.body).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
      }),
    );
  });

  it('should be able to update candidate', async () => {
    const candidate = await request(app).post('/candidate').send({
      name: 'Moises Teste',
      email: 'moises@gmail.com',
      fone: '5332606078',
      cpf: '03872392065',
    });

    const response = await request(app)
      .put(`/candidate/${candidate.body.id}`)
      .send({
        name: 'Fernanda Teste',
        email: 'fernanda@gmail.com',
        fone: '5332606078',
        cpf: '03872392065',
      });

    expect(response.body).toMatchObject({
      name: 'Fernanda Teste',
      email: 'fernanda@gmail.com',
    });
  });

  it('should be able to delete candidate', async () => {
    const candidateRepository = getRepository(Candidate);

    const response = await request(app).post('/candidate').send({
      name: 'Fernando Teste',
      email: 'fernando@gmail.com',
      fone: '5332606078',
      cpf: '03802312065',
    });

    await request(app).delete(`/candidate/${response.body.id}`);

    const candidate = await candidateRepository.findOne(response.body.id);

    expect(candidate).toBeFalsy();
  });

  it('you should not create candidate with email that already exist', async () => {
    await request(app).post('/candidate').send({
      name: 'Teste Teste',
      email: 'teste@gmail.com',
      fone: '5332606078',
      cpf: '03802317777',
    });

    const response = await request(app).post('/candidate').send({
      name: 'Nave Teste',
      email: 'teste@gmail.com',
      fone: '5332606078',
      cpf: '03806534777',
    });

    expect(response.body).toMatchObject(
      expect.objectContaining({
        message: 'Email address already used.',
      }),
    );
  });

  it('you should not create candidate with cpf that already exist', async () => {
    await request(app).post('/candidate').send({
      name: 'Teste12 Teste',
      email: 'teste@gmail.com',
      fone: '5332606078',
      cpf: '03802317777',
    });

    const response = await request(app).post('/candidate').send({
      name: 'Nave 2020 Teste',
      email: 'teste22@gmail.com',
      fone: '5332606078',
      cpf: '03802317777',
    });

    expect(response.body).toMatchObject(
      expect.objectContaining({
        message: 'Cpf already used.',
      }),
    );
  });
});
