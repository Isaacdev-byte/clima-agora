// Clima Agora - src/routes/clima.js
// Rota: GET /api/clima?cidade=NOME

const express = require("express");
const { buscarClima } = require("../services/climaService");
const { ErroDeClima } = require("../utils/erros");

const router = express.Router();

router.get("/", async function (req, res) {
  // Le o parametro "cidade" da URL; se nao vier nada, usa texto vazio.
  const cidade = (req.query.cidade || "").trim();

  try {
    const dados = await buscarClima(cidade);
    return res.json(dados);
  } catch (erro) {
    // Erro conhecido (busca vazia, nao encontrada, falha): usa o status dele.
    if (erro instanceof ErroDeClima) {
      return res.status(erro.status).json({
        erro: erro.codigo,
        mensagem: erro.mensagem,
      });
    }

    // Erro inesperado: registra no terminal e responde com falha generica.
    console.error(erro);
    return res.status(500).json({
      erro: "falha_consulta",
      mensagem: "Nao foi possivel consultar o clima.",
    });
  }
});

module.exports = router;