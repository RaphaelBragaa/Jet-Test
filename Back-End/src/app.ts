import express from 'express'
import tarefaRouter from './routers/tarefa-router.ts';
import * as dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const server = express()
server.use(cors())
      .use(express.json())
      .use('/', tarefaRouter);


const PORT = process.env.PORT || 5000;

server.get('/', (req, res) => {
  res.send('Servidor ativo!');
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
