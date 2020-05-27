import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import createConnection from '../database';

import app from '../app';

let connection: Connection;

describe('Session', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');
    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM users');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to create new Session', async () => {
    const user = await request(app).post('/users').send({
      name: 'Teste Token',
      email: 'testetoken@gmail.com',
      password: '1234781',
    });

    const response = await request(app).post('/sessions').send({
      email: 'testetoken@gmail.com',
      password: '1234781',
    });

    expect(response.body).toMatchObject(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.any(Object),
      }),
    );

    await request(app).delete(`/users/${user.body.id}`);
  });
});
