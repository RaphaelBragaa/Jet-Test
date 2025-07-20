import dotenv from 'dotenv';

dotenv.config();

const dbUri = process.env.DB_URI;

console.log('Configuração do banco de dados:', dbUri);

export async function connectToDatabase() {
  try {
    await dbUri;
    console.log('Conectado ao Banco de Dados!');
    return dbUri;
  } catch (err) {
    console.error('Erro ao conectar ao Banco de Dados:', err);
    throw err;
  }
}
