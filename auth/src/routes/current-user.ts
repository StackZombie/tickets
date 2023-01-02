import express, { Response, Request } from 'express';
const router = express.Router();
import { currentUser } from '@oristic/common';

router.get(
  '/api/users/currentUser',
  currentUser,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
