import request from 'supertest';
// import { expect } from 'chai';

import createServer from 'server';
const app = createServer();

describe('server', function () {
  it('/ responds with 200', async function () {
    return request(app).get('/').expect(200);
  });
});
