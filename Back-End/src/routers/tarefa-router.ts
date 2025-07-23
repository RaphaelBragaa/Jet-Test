import { Router } from 'express';
import authMiddleware from '../middleware/auth-middleware.ts';
import { criarTarefaController, listarTarefasController } from '../controllers/tarefa-controller.ts';

// Criando um roteador para as tarefas
const router = Router();

// Definindo as rotas para tarefas
router.post('/tarefas', authMiddleware, criarTarefaController);
router.get('/tarefas', listarTarefasController);

export default router;
