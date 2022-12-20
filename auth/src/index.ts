import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/singout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './Errors/not-found-error';

import cookieSession from 'cookie-session';
import mongoose from 'mongoose';
const app = express();
app.set('trust proxy', true); // all our traffic are through nginx proxy

app.use(json());
app.use(
  cookieSession({
    signed: false, // as jwt is already encryped so we are not using signed here
    secure: true, // enable https req
  })
);

app.use(signoutRouter);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);

mongoose.set('strictQuery', false);

// all not found urls
app.all('*', async (req, res) => {
  throw new NotFoundError();
});
// middleware
app.use(errorHandler);
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT Token is not defined');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error', error);
  }
};

start();
app.listen(3000, () => {
  console.log('Listening on port 3000!!!!!!!!');
});
