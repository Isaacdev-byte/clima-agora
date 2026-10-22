// Clima Agora - src/utils/erros.js
// Um tipo de erro nosso: carrega um codigo (para o front-end) e um status HTTP.

class ErroDeClima extends Error {
  constructor(codigo, mensagem, status) {
    super(mensagem);
    this.codigo = codigo; 
    this.status = status; 
  }
}

module.exports = { ErroDeClima };