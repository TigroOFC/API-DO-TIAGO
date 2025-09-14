import { writeFileSync, readFileSync, existsSync } from "fs";
import { v4 as uuidv4 } from "uuid";

export default function handler(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).json({error: "Método não permitido"});
    }

    const { name } = req.body;
    if(!name) return res.status(400).json({error: "Nome é obrigatório"});

    let keys = [];
    if(existsSync("keys.json")) {
        keys = JSON.parse(readFileSync("keys.json"));
    }

    const apiKey = uuidv4();
    keys.push({name, apiKey, createdAt: new Date()});
    writeFileSync("keys.json", JSON.stringify(keys, null, 2));

    res.status(200).json({apiKey});
}
