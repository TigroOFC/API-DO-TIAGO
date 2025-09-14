export default function handler(req, res) {
  // Gera uma chave aleatória (UUID)
  const apiKey = cryptoRandomKey();

  res.status(200).json({ apiKey });
}

function cryptoRandomKey() {
  // 32 caracteres aleatórios hexadecimais
  return [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}
