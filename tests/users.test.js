'use strict';

const request = require('supertest');
const app     = require('../src/app');

describe('Users API', () => {

  describe('GET /api/users', () => {
    it('tüm kullanıcıları döndürmeli', async () => {
      const res = await request(app).get('/api/users');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('count');
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.count).toBeGreaterThan(0);
    });
  });

  describe('GET /api/users/:id', () => {
    it('var olan kullanıcıyı döndürmeli', async () => {
      const res = await request(app).get('/api/users/1');
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe(1);
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('email');
    });

    it('olmayan kullanıcı için 404 dönmeli', async () => {
      const res = await request(app).get('/api/users/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /api/users', () => {
    it('yeni kullanıcı oluşturmalı', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'Test User', email: 'test@example.com' });
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe('Test User');
      expect(res.body.role).toBe('user');
    });

    it('eksik alan varsa 400 dönmeli', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'Sadece İsim' });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('var olan kullanıcıyı silmeli', async () => {
      const res = await request(app).delete('/api/users/1');
      expect(res.statusCode).toBe(204);
    });

    it('olmayan kullanıcı için 404 dönmeli', async () => {
      const res = await request(app).delete('/api/users/999');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('404 handler', () => {
    it('olmayan route için 404 dönmeli', async () => {
      const res = await request(app).get('/olmayan-bir-route');
      expect(res.statusCode).toBe(404);
    });
  });

});
