import express, { Response, Request } from 'express';
const router = express.Router();
import { currentUser } from '../middleware/current-user';
import { requireAuth } from '../middleware/require-auth';

router.get(
  '/api/users/currentUser',
  currentUser,
  requireAuth,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
