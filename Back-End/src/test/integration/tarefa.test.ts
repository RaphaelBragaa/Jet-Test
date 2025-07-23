import app from "../../app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import http from "http";
import { GeradorDeToken } from "../../utils/gerador-token";
import { Tarefa } from "../../models/tarefaModel";

describe("Testes de integração para o CRUD de Tarefas", () => {
  let tarefaId: number;
  let server: http.Server;
  let token: string;

  beforeAll(async () => {
    server = app.listen(0);
    token = GeradorDeToken("usuario_teste"); // token JWT válido
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  });

  it("Deve criar uma nova tarefa com token válido", async () => {
    const novaTarefa: Omit<Tarefa, "id"> = {
      titulo: "Tarefa de Teste",
      descricao: "Descrição da tarefa de teste",
      horarioExecucao: new Date(Date.now() + 3600000), // 1h à frente
    };

    const response = await request(server)
      .post("/tarefas")
      .set("Authorization", `Bearer ${token}`)
      .send(novaTarefa);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    tarefaId = response.body.id;
  });

  it("Deve listar todas as tarefas", async () => {
    const response = await request(server).get("/tarefas");

    expect(response.status).toBe(200);
    expect(response.body.tarefas).toBeInstanceOf(Array);
    expect(response.body.tarefas.length).toBeGreaterThan(0);
  });

  it(" Não deve criar tarefa sem token JWT", async () => {
    const tarefaInvalida: Omit<Tarefa, "id"> = {
      titulo: "Sem token",
      descricao: "Acesso sem autenticação",
      horarioExecucao: new Date(Date.now() + 3600000),
    };

    const response = await request(server)
      .post("/tarefas")
      .send(tarefaInvalida);

    expect(response.status).toBe(401);
    expect(response.body.erro).toBe("Token não fornecido");
  });

  it("Não deve criar tarefa com token inválido", async () => {
    const tarefaInvalida: Omit<Tarefa, "id"> = {
      titulo: "Token errado",
      descricao: "Esse token não bate com o segredo",
      horarioExecucao: new Date(Date.now() + 3600000),
    };

    const response = await request(server)
      .post("/tarefas")
      .set("Authorization", "Bearer token_falso") // token inválido
      .send(tarefaInvalida);

    expect(response.status).toBe(403);
    expect(response.body.erro).toBe("Token inválido ou expirado");
  });

  it("Não deve criar tarefa com horário no passado", async () => {
    const tarefaFalha: Omit<Tarefa, "id"> = {
      titulo: "Passado",
      descricao: "Tarefa fora do prazo",
      horarioExecucao: new Date("2025-07-20T09:30:00.000Z"), // 1h atrás
    };

    //Autenticação com token válido
    const response = await request(server)
      .post("/tarefas")
      .set("Authorization", `Bearer ${token}`)
      .send(tarefaFalha);

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/horário.*no passado/i);
  });

});
