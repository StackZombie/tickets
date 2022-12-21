import express, { Response, Request } from 'express';
const router = express.Router();

router.get('/api/users/signout', (req: Request, res: Response) => {
  req.session = null;
  console.log('RUNS');
  res.send({});
});

export { router as signoutRouter };
