const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Carrega variáveis de ambiente
dotenv.config();

// Importa o modelo de usuário
const User = require('./models/User');

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Conectado ao MongoDB com sucesso');
    
    try {
      // Busca todos os usuários
      const users = await User.find({});
      
      console.log('Usuários encontrados:', users.length);
      
      // Exibe os detalhes de cada usuário
      users.forEach(user => {
        console.log('------------------------------');
        console.log('Email:', user.email);
        console.log('Senha:', user.password); // Agora a senha não está criptografada
        console.log('Lembrar-me:', user.rememberMe);
        console.log('Data de criação:', user.createdAt);
      });
      
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      // Fecha a conexão com o MongoDB
      mongoose.connection.close();
      console.log('Conexão com o MongoDB fechada');
    }
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });