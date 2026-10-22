// Teste manual: node src/testes/previsaoManual.js "Nome da cidade"

const { buscarLocalidade } = require("../services/geocodingService");
const { buscarPrevisao } = require("../services/forecastService");

const nome = process.argv.slice(2).join(" ");

async function testar() {
  const local = await buscarLocalidade(nome);
  const previsao = await buscarPrevisao(local.latitude, local.longitude);

  console.log("Local:", local.nome, "-", local.regiao, "-", local.pais);
  console.log("Condicao:", previsao.icone, previsao.condicao);
  console.log("Temperatura:", previsao.temperaturaC + " C");
  console.log("Sensacao termica:", previsao.sensacaoC + " C");
  console.log("Chance de chuva:", previsao.chanceChuvaPct + " %");
}

testar().catch(function (erro) {
  console.log("Erro:", erro.codigo, "-", erro.mensagem, "(status " + erro.status + ")");
});