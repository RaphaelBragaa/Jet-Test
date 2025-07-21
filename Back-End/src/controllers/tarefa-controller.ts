import { Request, Response } from 'express';
import { criarTarefaRepositorie, listarTarefasRepositorie } from '../repositories/tarefaRepositorie.ts';
import { Tarefa, ListaDeTarefas } from '../models/tarefaModel.ts';

// Controlador para criar uma nova tarefa
export async function criarTarefaController(req: Request, res: Response): Promise<Response> {
    if (!req.body) {
        return res.status(400).json({ error: 'Corpo da requisição inválido ou faltando atributos' });
    }
    const tarefa: Tarefa = req.body;
    try{
        const novaTarefa = await criarTarefaRepositorie(tarefa);
        return res.status(201).json(novaTarefa);
    }catch (error) {
        console.error('Erro ao criar tarefa:', error);
        return res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
}

// Controlador para listar todas as tarefas
export async function listarTarefasController(req: Request, res: Response): Promise<Response> {
    try {
        const tarefas: ListaDeTarefas = await listarTarefasRepositorie();
        return res.status(200).json(tarefas);
    } catch (error) {
        console.error('Erro ao listar tarefas:', error);
        return res.status(500).json({ error: 'Erro ao listar tarefas' });
    }
}
