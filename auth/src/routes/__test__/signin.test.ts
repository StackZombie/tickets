import request from 'supertest';
import { app } from '../../app';

it('failed when the email that does not exist in supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@gmail.com',
      password: '123qweasd',
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'alpha@mail.com',
      password: '123qweasd',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'alpha@gmail.com',
      password: 'qedafgrr',
    })
    .expect(400);
});
it('fails when an incorrent email and password is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test.com',
      password: '1',
    })
    .expect(400);
});

it('responds with cookies when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'alpha@gmail.com',
      password: '123qweasd',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'alpha@gmail.com',
      password: '123qweasd',
    })
    .expect(200);
  expect(response.get('Set-Cookie')).toBeDefined();
});
