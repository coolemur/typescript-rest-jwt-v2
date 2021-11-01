import request from 'supertest';
// import { expect } from 'chai';

import createServer from 'server';
const app = createServer();

describe('auth routes', function () {
  it('/auth/register responds with 200', function () {
    return request(app).post('/auth/register').send({
      'email': 'new_user@email.com',
      'password': 'new_password'
    }).expect(200);
  });

  it('/auth/login responds with 200', function () {
    return request(app).post('/auth/login').send({
      'email': 'new_user@email.com',
      'password': 'new_password'
    }).expect(200);
  });
});
