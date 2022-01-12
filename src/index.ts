import express, { NextFunction, Request, Response } from 'express';

const app = express();

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ hello: 'wsasouza' });
}); 

app.listen(3000, () => {
  console.log('Server is running...');
})