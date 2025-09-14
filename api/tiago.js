// /api/tiago.js
export default function handler(req, res) {
  // Aqui validamos a chave enviada pelo cliente
  const { key } = req.query;

  if (key !== "a750d04c-58d9-4f00-88d5-19da791d4e19") {
    return res.status(403).json({ error: "API key inválida" });
  }

  // Resposta da sua API
  res.status(200).json({
    message: "Olá! Esta é a API do Tiago funcionando com sucesso 🚀"
  });
}
