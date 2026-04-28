'use strict';

const request = require('supertest');
const app     = require('../src/app');

describe('GET /health', () => {
  it('200 dönmeli ve status ok olmalı', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('timestamp');
  });
});
