
const CODIGOS = {
  0: { texto: "Céu limpo", icone: "☀️", iconeNoite: "🌙" },
  1: { texto: "Predominantemente limpo", icone: "🌤️", iconeNoite: "🌙" },
  2: { texto: "Parcialmente nublado", icone: "⛅", iconeNoite: "☁️" },
  3: { texto: "Nublado", icone: "☁️" },
  45: { texto: "Neblina", icone: "🌫️" },
  48: { texto: "Neblina com geada", icone: "🌫️" },
  51: { texto: "Garoa fraca", icone: "🌦️" },
  53: { texto: "Garoa moderada", icone: "🌦️" },
  55: { texto: "Garoa intensa", icone: "🌦️" },
  56: { texto: "Garoa congelante fraca", icone: "🌧️" },
  57: { texto: "Garoa congelante intensa", icone: "🌧️" },
  61: { texto: "Chuva fraca", icone: "🌧️" },
  63: { texto: "Chuva moderada", icone: "🌧️" },
  65: { texto: "Chuva forte", icone: "🌧️" },
  66: { texto: "Chuva congelante fraca", icone: "🌧️" },
  67: { texto: "Chuva congelante forte", icone: "🌧️" },
  71: { texto: "Neve fraca", icone: "🌨️" },
  73: { texto: "Neve moderada", icone: "🌨️" },
  75: { texto: "Neve forte", icone: "❄️" },
  77: { texto: "Grãos de neve", icone: "❄️" },
  80: { texto: "Pancadas de chuva fracas", icone: "🌦️" },
  81: { texto: "Pancadas de chuva moderadas", icone: "🌧️" },
  82: { texto: "Pancadas de chuva violentas", icone: "🌧️" },
  85: { texto: "Pancadas de neve fracas", icone: "🌨️" },
  86: { texto: "Pancadas de neve fortes", icone: "🌨️" },
  95: { texto: "Trovoada", icone: "⛈️" },
  96: { texto: "Trovoada com granizo fraco", icone: "⛈️" },
  99: { texto: "Trovoada com granizo forte", icone: "⛈️" },
};

// ehDia: true de dia, false de noite. Alguns codigos tem icone diferente a noite.
function descreverCodigo(codigo, ehDia) {
  const item = CODIGOS[codigo];

  if (!item) {
    return { condicao: "Condição indisponível", icone: "🌡️" };
  }

  const icone = ehDia === false && item.iconeNoite ? item.iconeNoite : item.icone;
  return { condicao: item.texto, icone: icone };
}

module.exports = { descreverCodigo };