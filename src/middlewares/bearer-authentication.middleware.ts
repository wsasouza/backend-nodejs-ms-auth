import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import ForbiddenError from 'models/errors/forbidden.error.model';

async function bearerAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {

  try {

    const authorizationHeader = req.headers['authorization'];

    if(!authorizationHeader) 
      throw new ForbiddenError('Falha na autenticação');   

    const [authenticationType, token] = authorizationHeader.split(' ');
    
    if(authenticationType !== 'Bearer' || !token)
      throw new ForbiddenError('Falha na autenticação');  
    
    const secretKey = process.env.SECRET; 

    if(!secretKey) 
      throw new ForbiddenError('Falha na autenticação');
    
    const tokenPayload = JWT.verify(token, secretKey);

    if(typeof tokenPayload !== 'object' || !tokenPayload.sub)
      throw new ForbiddenError('Falha na autenticação');    
    
    const user = {
      id: tokenPayload.sub,
      username: tokenPayload.username
    }

    req.user = user;

    next();

  } catch(error) {
    next(error);
  }
}

export default bearerAuthenticationMiddleware;