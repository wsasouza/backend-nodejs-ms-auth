import { NextFunction, Request, Response, Router } from 'express';
import ForbiddenError from 'models/errors/forbidden.error.model';
import JWT, { SignOptions } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import basicAuthenticationMiddleware from 'middlewares/basic-authentication.middleware';
import jwtAuthenticationMiddleware from 'middlewares/jwt-authentication.middleware';

const authRoute = Router();

authRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const user = req.user;

    if(!user) 
      throw new ForbiddenError('Falha na autenticação');

    const jwtPayload = { username: user.username };
    const jwtOptions: SignOptions = { subject: user?.id, expiresIn: '1d' };
    const secretKey = process.env.SECRET; 

    if(!secretKey) 
      throw new ForbiddenError('Falha na autenticação');

    const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

    res.status(StatusCodes.OK).json({  token: jwt });
    
  } catch(error) {
      next(error);
  }
});

authRoute.post('/token/validate', jwtAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(StatusCodes.OK);
});

export default authRoute;