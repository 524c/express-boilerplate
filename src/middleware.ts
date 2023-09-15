import { Request, Response, NextFunction } from 'express';

function myMiddleware(_req: Request, res: Response, next: NextFunction) {
  res.setHeader('x-custom-header', '123');

  next();
}

const requireJsonContent = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.is('application/json')) {
      return res.status(415).send('Unsupported Media Type');
    }
    return next();
  };
};

export { myMiddleware, requireJsonContent };
