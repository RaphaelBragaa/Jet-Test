import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


function authMiddleware (req: Request, res: Response, next: NextFunction){
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  } 

    // Divide o header: ['Bearer', '<token>']
  const [scheme, token] = authHeader.split(' ');

  // Valida o formato
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ erro: 'Token mal formatado' });
  }
  
   try {
    jwt.verify(token as string, 'sua_chave_supersecreta' as string);
    return next();
  } catch {
    return res.status(403).json({ erro: 'Token inválido ou expirado' });
  }
}

export default authMiddleware;
