// Junta a geocodificacao e a previsao e devolve os dados no formato que o front-end espera.

const { buscarLocalidade } = require ("./geocodingService");
const { buscaPrevisao, buscarPrevisao } = require ("./forecastService");

function montarNomeDaLocalidade (local) {
  const partes = [local.nome];
  if (local.regiao && local.regiao !== local.nome) {
    partes.push(local.regiao);
  }
  if (local.pais) {
    partes.push(local.pais);
  }
  return partes.join(", ");
}

async function buscarClima(cidade) {
  const local = await buscarLocalidade (cidade);
  const previsao = await buscarPrevisao(local.latitude, local.longitude);

  return {
    localidade:montarNomeDaLocalidade(local),
    condicao: previsao.condicao,
    icone: previsao.icone,
    temperaturaC: previsao.temperaturaC,
    chanceChuvaPct: previsao.chanceChuvaPct,
    sensacaoC: previsao.sensacaoC,
  };
}

module.exports = { buscarClima };