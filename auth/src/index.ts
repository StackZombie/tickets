import mongoose from 'mongoose';
import { app } from './app';
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
