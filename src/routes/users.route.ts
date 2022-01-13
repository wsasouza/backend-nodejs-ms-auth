import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwtAuthenticationMiddleware from 'middlewares/jwt-authentication.middleware';
import userRepository from 'repositories/user.repository';

const usersRoute = Router();

interface IUser {
  name: string;
  username: string;
  password: string;
}

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userRepository.findAll();
    res.status(StatusCodes.OK).send(users);
  } catch(error) {
      next(error);
  }
});

usersRoute.get('/users/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const user = await userRepository.findById(id);
    res.status(StatusCodes.OK).send(user);
  } catch(error) {
      next(error);
  }
});

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    const newUser = await userRepository.createUser(user);
    res.status(StatusCodes.CREATED).send(newUser);
  } catch(error) {
      next(error);
  }
});

usersRoute.put('/users/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const modifiedUser = req.body;

    modifiedUser.id = id;

    await userRepository.updateUser(modifiedUser);

    res.status(StatusCodes.OK).send();
  } catch(error) {
      next(error);
  }
});

usersRoute.delete('/users/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    await userRepository.removeUser(id);

    res.status(StatusCodes.NO_CONTENT).send();
  } catch(error) {
      next(error);
  }
});

export default usersRoute;