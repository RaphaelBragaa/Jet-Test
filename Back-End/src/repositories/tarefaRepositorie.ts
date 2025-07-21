import { Tarefa, ListaDeTarefas } from '../models/tarefaModel.ts';
import { PrismaClient } from '../generated/prisma/client.js';

// Importando o PrismaClient para interagir com o banco de dados
const prisma = new PrismaClient();

// Função para criar uma nova tarefa no repositório
export async function criarTarefaRepositorie(tarefa: Tarefa): Promise<Tarefa> {
    return prisma.tarefa.create({
        data: tarefa
    });
}

// Função para listar todas as tarefas no repositório
export async function listarTarefasRepositorie(): Promise<ListaDeTarefas> {
    const tarefas = await prisma.tarefa.findMany();
    return { tarefas };
}


