import './App.css';
import { TarefasService } from './services/tarefas';
import type { Tarefa } from './services/tarefas';
import React, { useEffect, useState } from 'react';
import { BsPencilSquare, BsFillTrashFill, BsCheckSquareFill } from "react-icons/bs";


function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    TarefasService.ListTarefas()
      .then((response) => {
        setTarefas(response);
        console.log("Tarefas listadas com sucesso:", response);
      })
      .catch((error) => {
        console.error("Erro ao listar tarefas:", error);
      });
  }, [tarefas]);

  // Função para adicionar uma nova tarefa
  function CadastrarTarefa(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const titulo = form.elements[0] as HTMLInputElement;
    const descricao = form.elements[1] as HTMLTextAreaElement;
    const horarioExecucao = form.elements[2] as HTMLInputElement;  

    const novaTarefa: Tarefa = {
      titulo: titulo.value,
      descricao: descricao.value,
      horarioExecucao: new Date(horarioExecucao.value),
    };

    TarefasService.CriarTarefa(novaTarefa)
      .then((response) => {
        setTarefas([...tarefas, response]);
        console.log("Tarefa criada com sucesso:", response);
      })
      .catch((error) => {
        console.error("Erro ao criar tarefa:", error);
      });
  }

  return (
    <>
      <div className="container-Tarefas">
        <h1>Lista de Tarefas</h1>
        <div className="forms-container">
          <form onSubmit={CadastrarTarefa} className="form-tarefa">
            <input type="text" placeholder="Título da Tarefa" required />
            <textarea placeholder="Descrição da Tarefa" required></textarea>
            <input type="datetime-local" required />
            <button type="submit">Adicionar Tarefa</button>
          </form>
        </div>
        <div className="card">
          <div className="card-search">
            {/* Barra de pesquisa para ser adicionada aqui */}
          </div>
          <div className="card-list">
            {tarefas.length === 0 && (
              <div>Nenhuma tarefa encontrada.</div>
            )}
            {tarefas.map((tarefa: Tarefa) => (
              <div key={tarefa.id} className="card-list-item">
                <div className="card-list-item-content">
                  <h2>{tarefa.titulo}</h2>
                  <p>{tarefa.descricao}</p>
                  <span className="card-list-item-date">
                  Horário: {new Date(tarefa.horarioExecucao).toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="card-list-item-actions">
                  <button><BsPencilSquare /></button>
                  <button><BsCheckSquareFill /></button>
                  <button><BsFillTrashFill /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
