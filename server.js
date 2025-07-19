const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Carrega variáveis de ambiente
dotenv.config();

// Inicializa o app Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Middleware para log de requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Conexão com o MongoDB
console.log('Tentando conectar ao MongoDB em:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado ao MongoDB com sucesso'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/users', require('./routes/users'));

// Rota para servir o frontend
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});