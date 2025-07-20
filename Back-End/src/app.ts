import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDatabase } from './database/db';

dotenv.config();

const server = express()
server.use(cors())
      .use(express.json())


connectToDatabase()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Server On! Porta: ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('Falha na inicialização:', err);
    process.exit(1);
  });
