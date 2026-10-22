// Clima Agora - src/server.js
// Servidor minimo: entrega os arquivos da pasta "public".
// Ainda NAO existe rota de clima nem conexao com a Open-Meteo.

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve os arquivos de public/ (index.html, styles.css, app.js)
app.use(express.static(path.join(__dirname, "..", "public")));

app.listen(PORT, function () {
  console.log("Servidor rodando em http://localhost:" + PORT);
});