import jwt from 'jsonwebtoken';

export function GeradorDeToken(userId: string): string {

  const secretKey = process.env.JWT_SECRET || 'sua_chave_supersecreta';     

    const token = jwt.sign({ id: userId }, secretKey);
    return token;    
    
}