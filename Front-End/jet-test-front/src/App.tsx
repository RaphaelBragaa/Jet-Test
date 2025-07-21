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

  return (
    <>
      <div className="container-Tarefas">
        <h1>Lista de Tarefas</h1>
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
