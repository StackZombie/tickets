import request from 'supertest';
import { app } from '../../app';

it('returns 201 on successfull signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'user@example.com',
      password: 'password',
    })
    .expect(201);
});

it('return a 400 on invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'adem.com',
      password: 'password',
    })
    .expect(400);
});

it('return 400 on invalid email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'alpha.com',
      password: '123qwea',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'alpha@beta.com',
      password: '1',
    })
    .expect(400);
});

it('disallows duplicate email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'alpha@beta.com',
      password: '123qweasd',
    })
    .expect(201);
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'alpha@beta.com',
      password: '123qweasd',
    })
    .expect(400);
});

it('tests a cookie after successfull sign up', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'alpha@beta.com',
      password: '123qweasd',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
