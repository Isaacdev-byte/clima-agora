// Clima Agora - app.js
// ainda sem conexão com a Open-Meteo.
// Os dados abaixo sao FICTICIOS e servem so para testar

const formulario = document.querySelector("form.search");
const campoCidade = document.getElementById("q");

// Mostra um estado da tela: "inicial", "carregando", "resultado", "e1", "e2" ou "e3".
// Funciona marcando o botao de radio escondido que o CSS ja usa.
function mostrarEstado(nome) {
  document.getElementById("s-" + nome).checked = true;
}

// Dados FICTICIOS para testar. Mais tarde, esta funcao sera trocada pelo servidor.
function buscarDadosDeTeste(cidade) {
  if (cidade.toLowerCase() === "teste") {
    return {
      localidade: "Cidade de teste (ficticia)",
      condicao: "Parcialmente nublado (exemplo)",
      icone: "⛅",
      temperaturaC: 25,
      chanceChuvaPct: 40,
      sensacaoC: 27,
    };
  }
  return null; // null = localidade nao encontrada
}

// Escreve os dados nos elementos do resultado.
function preencherResultado(dados) {
  document.getElementById("res-local").textContent = dados.localidade;
  document.getElementById("res-icone").textContent = dados.icone;
  document.getElementById("res-cond").textContent = dados.condicao;
  document.getElementById("res-temp").textContent = dados.temperaturaC + "°C";
  document.getElementById("res-chuva").textContent = dados.chanceChuvaPct + "%";
  document.getElementById("res-sensacao").textContent = dados.sensacaoC + "°C";
}

// Quando o formulario for enviado (clique no botao ou Enter):
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // impede a pagina de recarregar

  const cidade = campoCidade.value.trim(); // texto digitado, sem espacos nas pontas

  if (cidade === "") {
    mostrarEstado("e1"); // busca vazia
    return;
  }

  mostrarEstado("carregando");

  // Espera de 0,8 s so para voce ver o estado "carregando" (teste).
  setTimeout(function () {
    if (cidade.toLowerCase() === "erro") {
      mostrarEstado("e3"); // teste de falha na consulta
      return;
    }

    const dados = buscarDadosDeTeste(cidade);
    if (dados === null) {
      mostrarEstado("e2"); // localidade nao encontrada
      return;
    }

    preencherResultado(dados);
    mostrarEstado("resultado");
  }, 800);
});