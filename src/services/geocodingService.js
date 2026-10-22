// Nimbos - src/services/geocodingService.js
// Transforma o nome de uma cidade em coordenadas, usando a API de geocodificacao da Open-Meteo.

const { ErroDeClima } = require("../utils/erros");

const URL_GEOCODING = "https://geocoding-api.open-meteo.com/v1/search";

async function buscarLocalidade(nome) {
  const busca = (nome || "").trim();

  if (busca === "") {
    throw new ErroDeClima("busca_vazia", "Informe uma cidade ou localidade.", 400);
  }

  const parametros = new URLSearchParams({
    name: busca,
    count: "1",
    language: "pt",
    format: "json",
  });

  let dados;
  try {
    const resposta = await fetch(URL_GEOCODING + "?" + parametros.toString(), {
      signal: AbortSignal.timeout(8000),
    });
    if (!resposta.ok) {
      throw new Error("status " + resposta.status);
    }
    dados = await resposta.json();
  } catch (erro) {
    // Detalhes tecnicos ficam so no terminal do servidor.
    console.error("Falha na geocodificacao:", erro.message);
    throw new ErroDeClima("falha_consulta", "Nao foi possivel consultar o clima.", 502);
  }

  // Quando nada e encontrado, a API nao devolve a lista "results".
  if (!dados.results || dados.results.length === 0) {
    throw new ErroDeClima("nao_encontrada", "Localidade nao encontrada.", 404);
  }

  const local = dados.results[0];
  return {
    nome: local.name,
    regiao: local.admin1 || null,
    pais: local.country || null,
    latitude: local.latitude,
    longitude: local.longitude,
    fuso: local.timezone || null,
  };
}

module.exports = { buscarLocalidade };