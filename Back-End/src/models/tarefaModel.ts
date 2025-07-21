export interface Tarefa {
  titulo: string;
  descricao: string;
  horarioExecucao: Date;
}
export interface ListaDeTarefas {
 tarefas: Tarefa[];
}