// Clima Agora - src/testes/geocodingManual.js
// Teste manual: node src/testes/geocodingManual.js "Nome da cidade"

const { buscarLocalidade } = require("../services/geocodingService");

const nome = process.argv.slice(2).join(" ");

buscarLocalidade(nome)
  .then(function (local) {
    console.log("Encontrado:", local);
  })
  .catch(function (erro) {
    console.log("Erro:", erro.codigo, "-", erro.mensagem, "(status " + erro.status + ")");
  });