import axios from 'axios';


const API_URL = "http://localhost:5000";

// Definição da interface Tarefa
export interface Tarefa {
  titulo: string;
  descricao: string;
  horarioExecucao: Date;
}

type ListaTarefas = { tarefas: Tarefa[] }; // Definição do tipo para a lista de tarefas

// Função para listar as tarefas
 function ListTarefas(): Promise<Tarefa[]> {
   const promise = axios.get<ListaTarefas>(`${API_URL}/tarefas`)
           .then(response => response.data.tarefas)

    return promise;
 }

   // Função para criar uma nova tarefa
 function CriarTarefa(body: Tarefa): Promise<Tarefa> {
    const promise = axios.post<Tarefa>(`${API_URL}/tarefas`, body)
      .then(response => response.data);
    return promise;
 }

 export const TarefasService = {
    ListTarefas,
    CriarTarefa
 };