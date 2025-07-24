import { Request, Response } from 'express';
import { criarTarefaRepositorie, listarTarefasRepositorie } from '../repositories/tarefaRepositorie.ts';
import { Tarefa, ListaDeTarefas } from '../models/tarefaModel.ts';
import dayjs from 'dayjs';
import axios from 'axios';
import { Queue, Worker, Job } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis();

// Define a fila para notificações
const notificacaoQueue = new Queue('notificacaoFila', { connection });

// Worker para processar o envio de notificações
const notificacaoWorker = new Worker('notificacaoFila', async (job: Job) => {
  const { tarefa, webhookUrl } = job.data;

  try {
    // Envia requisição POST para webhook com os dados da tarefa
    await axios.post(webhookUrl, { tarefa });
    console.log(`Notificação enviada para tarefa ${tarefa.id}`);
  } catch (error) {
    console.error('Erro ao enviar notificação via webhook:', error);
    throw error; // para BullMQ tentar novamente se configurado retry
  }
}, { connection });
// Controlador para criar uma nova tarefa
export async function criarTarefaController(req: Request, res: Response): Promise<Response> {
  if (!req.body) {
    return res.status(400).json({ error: 'Corpo da requisição inválido ou faltando atributos' });
  }

  const { horarioExecucao, webhookUrl, ...rest } = req.body;

  if (!webhookUrl) {
    return res.status(400).json({ error: 'URL do webhook é obrigatória' });
  }

  if (!dayjs(horarioExecucao).isValid()) {
    return res.status(400).json({ error: 'Formato do horário de execução inválido' });
  }

  if (dayjs(horarioExecucao).isBefore(dayjs())) {
    return res.status(400).json({ error: 'Horário de execução não pode ser no passado' });
  }

  const tarefa = { horarioExecucao, ...rest };

  try {
    // Cria a tarefa no banco
    const novaTarefa = await criarTarefaRepositorie(tarefa);

    // Calcula o timestamp para envio da notificação (5 minutos antes)
    const timestampNotificacao = dayjs(horarioExecucao).subtract(5, 'minute').valueOf();

    // Agenda job na fila para enviar notificação 5min antes
    await notificacaoQueue.add(
      'enviarNotificacao', 
      { tarefa: novaTarefa, webhookUrl },
      { delay: timestampNotificacao - Date.now() }
    );

    return res.status(201).json(novaTarefa);

  } catch (error) {
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
