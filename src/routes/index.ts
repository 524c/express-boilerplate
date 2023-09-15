import express, { Request, Response, Router /*, NextFunction*/ } from 'express';

const router: Router = express.Router();

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
}

router.get(
  '/',
  (req: Request, res: Response /*, next: NextFunction*/): void => {
    res.send(JSON.stringify({ message: 'Hello, World!' }));
  }
);

router.post(
  '/register',
  (
    req: Request<Record<string, unknown>, unknown, RegisterRequest>,
    res: Response
  ): void => {
    if (!req.body.firstName) {
      res.status(400).json({ message: 'You need to pass first name' });
    }
    res.status(201).json({ message: 'User is Created' });
  }
);

router.get('/test', (req: Request, res: Response): void => {
  res.send('<h3>Hello from test page!</h3>');
});

router.get('/api', (req: Request, res: Response): void => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ message: 'Hello from test api!' }));
});

export default router;
