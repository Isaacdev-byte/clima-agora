// Busca a previsao (condicao, temperatura, sensacao e chance de chuva) na Open-Meteo, a partir de latitude e longitude.

const { ErroDeClima } = require("../utils/erros");
const { descreverCodigo } = require("../utils/weatherCodes");

const URL_PREVISAO = "https://api.open-meteo.com/v1/forecast";

function falhaNaConsulta() {
  return new ErroDeClima("falha_consulta", "Nao foi possivel consultar o clima.", 502);
}

async function buscarPrevisao(latitude, longitude) {
  const parametros = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,apparent_temperature,weather_code,is_day",
    hourly: "precipitation_probability",
    timezone: "auto",
    forecast_days: "1",
  });

  let dados;
  try {
    const resposta = await fetch(URL_PREVISAO + "?" + parametros.toString(), {
      signal: AbortSignal.timeout(8000),
    });
    if (!resposta.ok) {
      throw new Error("status " + resposta.status);
    }
    dados = await resposta.json();
  } catch (erro) {
    console.error("Falha na previsao:", erro.message);
    throw falhaNaConsulta();
  }

  // Confere se a resposta tem o que precisamos.
  const atual = dados.current;
  if (
    !atual ||
    typeof atual.temperature_2m !== "number" ||
    typeof atual.apparent_temperature !== "number"
  ) {
    console.error("Resposta de previsao incompleta.");
    throw falhaNaConsulta();
  }

  // A chance de chuva vem por hora. Procura a hora que corresponde a "agora".
  // Ex.: "2026-10-22T14:15" -> "2026-10-22T14:00"
  let chanceChuva = null;
  const horas = dados.hourly && dados.hourly.time;
  const chances = dados.hourly && dados.hourly.precipitation_probability;
  if (Array.isArray(horas) && Array.isArray(chances)) {
    const horaAtual = atual.time.slice(0, 13) + ":00";
    const posicao = horas.indexOf(horaAtual);
    if (posicao !== -1 && typeof chances[posicao] === "number") {
      chanceChuva = chances[posicao];
    }
  }

  const descricao = descreverCodigo(atual.weather_code, atual.is_day === 1);

  return {
    condicao: descricao.condicao,
    icone: descricao.icone,
    temperaturaC: Math.round(atual.temperature_2m),
    chanceChuvaPct: chanceChuva,
    sensacaoC: Math.round(atual.apparent_temperature),
  };
}

module.exports = { buscarPrevisao };