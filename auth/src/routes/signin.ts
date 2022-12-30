import express, { Response, Request } from 'express';
import { body } from 'express-validator';
import { validateRequest, BadRequestError } from '@oristic/common';
import { User } from '../models/User';
import { Password } from '../Services/password';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.get(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials');
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (passwordMatch) {
      const userJwt = jwt.sign(
        {
          id: existingUser._id,
          email: existingUser.email,
        },
        process.env.JWT_KEY!
      );

      req.session = {
        jwt: userJwt,
      };

      return res.status(200).send(existingUser);
    }

    throw new BadRequestError('Invalid Credentials');
  }
);

export { router as signinRouter };
