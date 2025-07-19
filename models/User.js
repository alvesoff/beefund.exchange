const mongoose = require('mongoose');
// Removida a importação do bcrypt, pois não estamos mais criptografando senhas

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  rememberMe: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Não vamos mais criptografar a senha antes de salvar
// Removido o middleware de hash da senha

// Método para verificar senha (comparação direta, sem criptografia)
UserSchema.methods.comparePassword = function(candidatePassword) {
  return candidatePassword === this.password;
};

module.exports = mongoose.model('User', UserSchema);