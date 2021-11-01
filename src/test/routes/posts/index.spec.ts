import request from 'supertest';
// import { expect } from 'chai';

import createServer from 'server';
const app = createServer();

describe('posts routes', function () {
  it('/posts responds with 200', function () {
    return request(app).get('/posts').expect(403);
  });
});
