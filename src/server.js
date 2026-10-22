// Clima Agora - src/server.js
// ETAPA DE TESTE: a rota /api/clima devolve respostas FICTICIAS.
// Ainda NAO existe conexao com a Open-Meteo nem chamadas externas.

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve os arquivos de public/ (index.html, styles.css, app.js)
app.use(express.static(path.join(__dirname, "..", "public")));

// Rota de clima: GET /api/clima?cidade=NOME
app.get("/api/clima", function (req, res) {
  // Le o parametro "cidade" da URL; se nao vier nada, usa texto vazio.
  const cidade = (req.query.cidade || "").trim();

  // 1) Busca vazia -> erro 400
  if (cidade === "") {
    return res.status(400).json({
      erro: "busca_vazia",
      mensagem: "Informe uma cidade ou localidade.",
    });
  }

  // 2) Teste de falha -> erro 500
  if (cidade.toLowerCase() === "erro") {
    return res.status(500).json({
      erro: "falha_consulta",
      mensagem: "Nao foi possivel consultar o clima.",
    });
  }

  // 3) Cidade de teste -> sucesso (dados FICTICIOS)
  if (cidade.toLowerCase() === "teste") {
    return res.json({
      ficticio: true,
      localidade: "Cidade de teste (ficticia)",
      condicao: "Parcialmente nublado (exemplo)",
      icone: "⛅",
      temperaturaC: 25,
      chanceChuvaPct: 40,
      sensacaoC: 27,
    });
  }

  // 4) Qualquer outra coisa -> nao encontrada (404)
  return res.status(404).json({
    erro: "nao_encontrada",
    mensagem: "Localidade nao encontrada.",
  });
});

app.listen(PORT, function () {
  console.log("Servidor rodando em http://localhost:" + PORT);
});