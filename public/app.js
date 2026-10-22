// Clima Agora - public/app.js
// Agora o front-end chama o back-end: GET /api/clima?cidade=NOME
// Os dados que o servidor devolve ainda sao FICTICIOS (etapa de teste).

const formulario = document.querySelector("form.search");
const campoCidade = document.getElementById("q");

// Mostra um estado da tela: "inicial", "carregando", "resultado", "e1", "e2" ou "e3".
// Funciona marcando o botao de radio escondido que o CSS ja usa.
function mostrarEstado(nome) {
  document.getElementById("s-" + nome).checked = true;
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

// Pede os dados ao servidor. Devolve os dados se der certo;
// se o servidor responder com erro, lanca um erro com o codigo recebido.
async function consultarClima(cidade) {
  const url = "/api/clima?cidade=" + encodeURIComponent(cidade);
  const resposta = await fetch(url);
  const dados = await resposta.json();

  if (!resposta.ok) {
    const erro = new Error(dados.mensagem);
    erro.codigo = dados.erro; // ex.: "busca_vazia", "nao_encontrada", "falha_consulta"
    throw erro;
  }

  return dados;
}

// Quando o formulario for enviado (clique no botao ou Enter):
formulario.addEventListener("submit", async function (evento) {
  evento.preventDefault(); // impede a pagina de recarregar

  const cidade = campoCidade.value.trim();

  if (cidade === "") {
    mostrarEstado("e1"); // busca vazia
    return;
  }

  mostrarEstado("carregando");

  try {
    const dados = await consultarClima(cidade);
    preencherResultado(dados);
    mostrarEstado("resultado");
  } catch (erro) {
    if (erro.codigo === "nao_encontrada") {
      mostrarEstado("e2"); // localidade nao encontrada
    } else {
      mostrarEstado("e3"); // falha na consulta ou servidor fora do ar
    }
  }
});