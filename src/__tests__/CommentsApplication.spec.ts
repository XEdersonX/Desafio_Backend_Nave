import request from 'supertest';
import { Connection, getRepository, getConnection } from 'typeorm';
import createConnection from '../database';

import CommentsApplication from '../models/CommentsApplication';

import app from '../app';

let connection: Connection;

let rootJwtToken = '';
let idUser = '';
let idApplication = '';

describe('CommentsApplication', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');
    await connection.runMigrations();

    await connection.query('DELETE FROM comments_application');
    await connection.query('DELETE FROM applications');
    await connection.query('DELETE FROM users');
    await connection.query('DELETE FROM vacancies');
    await connection.query('DELETE FROM candidate');

    // Criar Usuario
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
    idUser = response.body.user.id;

    // Criar Candidato
    const candidate = await request(app).post('/candidate').send({
      name: 'Rodrigo Oliveira',
      email: 'teste166@gmail.com',
      fone: '5332903297',
      cpf: '01233772090',
    });

    // Criar Vaga
    const vacancy = await request(app)
      .post('/vacancies')
      .set('Authorization', rootJwtToken)
      .send({
        title: 'Backend Teste 1',
        description: 'Node',
      });

    // Criar Candidatura
    const application = await request(app).post('/applications').send({
      id_candidate: candidate.body.id,
      id_vacancies: vacancy.body.id,
    });

    idApplication = application.body.id;
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to list comments', async () => {
    await request(app)
      .post('/commentsApplications')
      .set('Authorization', rootJwtToken)
      .send({
        id_application: idApplication,
        description: 'CV em Analise',
        id_user: idUser,
      });

    await request(app)
      .post('/commentsApplications')
      .set('Authorization', rootJwtToken)
      .send({
        id_application: idApplication,
        description: 'Entrevista Realizada',
        id_user: idUser,
      });

    await request(app)
      .post('/commentsApplications')
      .set('Authorization', rootJwtToken)
      .send({
        id_application: idApplication,
        description: 'Aprovado na entrevista',
        id_user: idUser,
      });

    const response = await request(app)
      .get(`/commentsApplications/${idApplication}`)
      .set('Authorization', rootJwtToken);

    expect(response.body).toHaveLength(3);
  });

  it('should be able to create new comment', async () => {
    const commentsRepository = getRepository(CommentsApplication);

    const response = await request(app)
      .post('/commentsApplications')
      .set('Authorization', rootJwtToken)
      .send({
        id_application: idApplication,
        description: 'Aprovado no teste logico',
        id_user: idUser,
      });

    const comment = await commentsRepository.findOne(response.body.id);

    expect(comment).toBeTruthy();

    expect(response.body).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
      }),
    );
  });

  it('should be able to update comment', async () => {
    const comment = await request(app)
      .post('/commentsApplications')
      .set('Authorization', rootJwtToken)
      .send({
        id_application: idApplication,
        description: 'Aprovado no teste de Banco Dados',
        id_user: idUser,
      });

    const response = await request(app)
      .put(`/commentsApplications/${comment.body.id}`)
      .set('Authorization', rootJwtToken)
      .send({
        id_application: idApplication,
        description: 'Aprovado no teste de Código',
        id_user: idUser,
      });

    expect(response.body).toMatchObject({
      description: 'Aprovado no teste de Código',
    });
  });

  it('should be able to delete comment', async () => {
    const commentsRepository = getRepository(CommentsApplication);

    const response = await request(app)
      .post('/commentsApplications')
      .set('Authorization', rootJwtToken)
      .send({
        id_application: idApplication,
        description: 'Teste para deletar',
        id_user: idUser,
      });

    await request(app)
      .delete(`/commentsApplications/${response.body.id}`)
      .set('Authorization', rootJwtToken);

    const comment = await commentsRepository.findOne(response.body.id);

    expect(comment).toBeFalsy();
  });
});
