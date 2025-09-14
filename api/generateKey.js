// Usando Node.js com ES Module (Vercel)
import { json } from '@vercel/node';

export default async function handler(req, res) {
    // Verifica se é POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    // Verifica a API key
    const apiKeyHeader = req.headers['x-api-key'];
    const validKey = "f171eb69a2ff11e72c7cee24c0de9dae"; // sua key
    if (apiKeyHeader !== validKey) {
        return res.status(401).json({ error: 'API key inválida' });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt não fornecido' });
    }

    // Aqui simulamos a IA respondendo
    // Você pode substituir por lógica mais complexa
    const reply = `TigroIA: Você disse "${prompt}". Resposta simulada da IA.`;

    res.status(200).json({ reply });
}
