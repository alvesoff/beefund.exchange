const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    
    // Verifica se o usuário já existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }
    
    // Cria um novo usuário
    user = new User({
      email,
      password,
      rememberMe: rememberMe || false
    });
    
    await user.save();
    
    res.status(201).json({ msg: 'Usuário registrado com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para login
router.post('/login', async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    
    console.log('Dados recebidos:', { email, rememberMe });
    
    // Verifica se o usuário existe
    let user = await User.findOne({ email });
    if (!user) {
      console.log('Usuário não encontrado, criando novo usuário');
      // Se o usuário não existe, cria um novo
      user = new User({
        email,
        password,
        rememberMe: rememberMe || false
      });
      
      await user.save();
      console.log('Novo usuário salvo com sucesso');
      return res.status(201).json({ msg: 'Usuário registrado com sucesso' });
    }
    
    console.log('Usuário encontrado:', user.email);
    
    // Se o usuário existe, atualiza o rememberMe se necessário
    if (user.rememberMe !== rememberMe) {
      user.rememberMe = rememberMe;
      await user.save();
      console.log('Preferência de rememberMe atualizada');
    }
    
    res.status(200).json({ msg: 'Login realizado com sucesso' });
  } catch (err) {
    console.error('Erro ao processar login:', err.message);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;