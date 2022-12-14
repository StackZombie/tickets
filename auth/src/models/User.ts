import mongoose from 'mongoose';
import { transform } from 'typescript';
import { Password } from '../Services/password';

// An interface that describes the properties
// that are required to create new user

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: UserAttrs): UserDoc;
}

// An interface that describes the properties that the UserDoc may holds

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attr: UserAttrs) => {
  return new User(attr);
};

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.password);
    this.set('password', hashedPassword);
  }
  done();
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
