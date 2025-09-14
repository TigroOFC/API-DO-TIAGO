import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(cors());
app.use(express.json());

// Banco de chaves em memória
const validKeys = [];

// Endpoint para gerar chave
app.get("/api/generate-key", (req, res) => {
  const key = uuidv4();
  validKeys.push(key);
  res.json({ key });
});

// Endpoint da API do Tiago
app.post("/api/tiago", (req, res) => {
  const apiKey = req.headers["x-api-key"];
  if (!validKeys.includes(apiKey)) return res.status(401).json({ error: "Chave inválida" });

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Mensagem obrigatória" });

  // Aqui você pode programar respostas dinâmicas
  const reply = `Tiago diz: você escreveu "${message}"`; 

  res.json({ reply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API do Tiago rodando na porta ${PORT}`));
