import request from 'supertest';
import { app } from '../../app';

it('responds with detail about the current user', async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get('/api/users/currentUser')
    .set('Cookie', cookie)
    .send({})
    .expect(200);
  expect(response.body.email).toBe('alpha@gmail.com');
  console.log('response.body', response.body);
});

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentUser')
    .send()
    .expect(200);
  expect(response.body.currentUser).toEqual(null);
});
