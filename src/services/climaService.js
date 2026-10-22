// Clima Agora - src/services/climaService.js
// ETAPA DE TESTE: devolve dados FICTICIOS.
// Na proxima etapa, o interior desta funcao sera trocado pela consulta a Open-Meteo.

const { ErroDeClima } = require("../utils/erros");

async function buscarClima(cidade) {
  // Busca vazia
  if (cidade === "") {
    throw new ErroDeClima("busca_vazia", "Informe uma cidade ou localidade.", 400);
  }

  // Teste de falha
  if (cidade.toLowerCase() === "erro") {
    throw new ErroDeClima("falha_consulta", "Nao foi possivel consultar o clima.", 500);
  }

  // Cidade de teste (dados FICTICIOS)
  if (cidade.toLowerCase() === "teste") {
    return {
      ficticio: true,
      localidade: "Cidade de teste (ficticia)",
      condicao: "Parcialmente nublado (exemplo)",
      icone: "⛅",
      temperaturaC: 25,
      chanceChuvaPct: 40,
      sensacaoC: 27,
    };
  }

  // Qualquer outra coisa
  throw new ErroDeClima("nao_encontrada", "Localidade nao encontrada.", 404);
}

module.exports = { buscarClima };