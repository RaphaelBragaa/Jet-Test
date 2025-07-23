import axios from 'axios';


const API_URL = "http://localhost:5000";

export interface Tarefa {
  titulo: string;
  descricao: string;
  horarioExecucao: Date;
}

type ListaTarefas = { tarefas: Tarefa[] };

 function ListTarefas(): Promise<Tarefa[]> {
    //const config = createHeaders()
   const promise = axios.get<ListaTarefas>(`${API_URL}/tarefas`)
           .then(response => response.data.tarefas)

    return promise;
 }

 function CriarTarefa(body: Tarefa): Promise<Tarefa> {
    //const config = createHeaders()
    const promise = axios.post<Tarefa>(`${API_URL}/tarefas`, body)
      .then(response => response.data);
    return promise;
 }

 export const TarefasService = {
    ListTarefas,
    CriarTarefa
 };