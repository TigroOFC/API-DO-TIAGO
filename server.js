import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Banco de chaves em memória
const validKeys = [];
const users = {}; // chave → IA do usuário

// Serve o frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Endpoint para gerar chave
app.get("/api/generate-key", (req, res) => {
  const key = uuidv4();
  validKeys.push(key);
  // Cria “IA” própria do usuário
  users[key] = { context: [], settings: { nome: "IA do usuário", personalidade: "amigável" } };
  res.json({ key });
});

// Endpoint da API do Tiago
app.post("/api/tiago", (req, res) => {
  const apiKey = req.headers["x-api-key"];
  if (!validKeys.includes(apiKey)) return res.status(401).json({ error: "Chave inválida" });

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Mensagem obrigatória" });

  // Salva contexto da IA do usuário
  users[apiKey].context.push({ role: "user", content: message });

  // Resposta da IA (simples, programada)
  const reply = `IA do Tiago (${apiKey.substring(0, 6)}): você disse "${message}"`;

  users[apiKey].context.push({ role: "assistant", content: reply });

  res.json({ reply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API do Tiago rodando na porta ${PORT}`));
