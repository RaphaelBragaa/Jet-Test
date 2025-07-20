import { Router } from 'express';
import { criarTarefaController, listarTarefasController } from '../controllers/tarefa-controller';

// Criando um roteador para as tarefas
const router = Router();

// Definindo as rotas para tarefas
router.post('/tarefas', criarTarefaController);
router.get('/tarefas', listarTarefasController);

export default router;
