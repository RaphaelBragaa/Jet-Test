export interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  horaExecucao: Date;
}
export interface ListaDeTarefas {
 tarefas: Tarefa[];
}