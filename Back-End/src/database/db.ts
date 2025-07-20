import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const dbFile = process.env.DATABASE_FILE || './database.sqlite';

console.log('Configuração do banco de dados:', dbFile);

// Função para conectar ou criar o banco SQLite
export function connectToDatabase(): sqlite3.Database {
  try {
    const db = new sqlite3.Database(dbFile, (err) => {
      if (err) {
        console.error('Erro ao conectar ao Banco de Dados:', err.message);
        throw err;
      }
      console.log('Conectado ao Banco de Dados!');
    });
    return db;
  } catch (err) {
    console.error('Erro inesperado ao criar conexão:', err);
    throw err;
  }
}

