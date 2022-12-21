import { app } from '../../app';
import request from 'supertest';

it('signout when the right credentials are provided', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'alpha@gmail.com',
      password: '123qweasd',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);

  expect(response.get('Set-Cookie')).toBeUndefined();
});
