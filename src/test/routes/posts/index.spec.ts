import request from 'supertest';
// import { expect } from 'chai';

import createServer from 'server';
const app = createServer();

describe('posts routes', function () {
  it('/posts responds with 200', async function () {
    await request(app).post('/auth/login').send({
      'email': 'new_user@email.com',
      'password': 'new_password'
    }).expect(200);

    return request(app).get('/posts').expect(403);
  });
});
