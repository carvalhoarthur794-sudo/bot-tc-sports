const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// ===============================
// CONFIGURAÇÕES
// ===============================
const PORT = process.env.PORT || 3000;
const ZAPI_INSTANCE_ID = process.env.ZAPI_INSTANCE_ID;
const ZAPI_TOKEN = process.env.ZAPI_TOKEN;
const SITE_URL = "https://tc-sports-2.myshopify.com";

// ===============================
// FUNÇÃO ENVIAR MENSAGEM
// ===============================
async function enviarMensagem(numero, mensagem) {
  await axios.post(
    `https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_TOKEN}/send-text`,
    {
      phone: numero,
      message: mensagem,
    }
  );
}

// ===============================
// WEBHOOK
// ===============================
app.post("/webhook", async (req, res) => {
  try {
    const texto = req.body.message?.text;
    const numero = req.body.phone;

    if (!texto || !numero) {
      return res.sendStatus(200);
    }

    const mensagem = texto.toLowerCase();

    // ===============================
    // SAUDAÇÃO
    // ===============================
    if (
      mensagem === "oi" ||
      mensagem === "ola" ||
      mensagem === "olá" ||
      mensagem.includes("bom dia") ||
      mensagem.includes("boa tarde") ||
      mensagem.includes("boa noite")
    ) {
      await enviarMensagem(
        numero,
        `Falaaa 👋😄  
Seja bem-vindo à *TC Sports* ⚽🔥  

Trabalhamos com:
🇧🇷 *Times do Brasil*  
🌍 *Times da Europa*  
🏆 *Todas as seleções*  

Me diga:
👉 Qual *time* ou *seleção* você procura?`
      );
      return res.sendStatus(200);
    }

    // ===============================
    // TAMANHO + GÊNERO
    // ===============================
    if (
      mensagem.includes("masculina") ||
      mensagem.includes("feminina") ||
      mensagem.includes("p") ||
      mensagem.includes("m") ||
      mensagem.includes("g") ||
      mensagem.includes("gg") ||
      mensagem.includes("xg") ||
      mensagem.includes("2gg")
    ) {
      await enviarMensagem(
        numero,
        `Perfeito 👌  

Temos esse modelo disponível sim ✅  
👕 Masculina e Feminina  
📏 Tamanhos do *P ao 2GG*  

👉 Para ver os modelos e finalizar com segurança, acesse:
${SITE_URL}

Se quiser, me diga novamente:
• Time ou seleção  
• Masculina ou Feminina  
• Tamanho 😉`
      );
      return res.sendStatus(200);
    }

    // ===============================
    // QUALQUER TIME OU SELEÇÃO
    // ===============================
    await enviarMensagem(
      numero,
      `Boa escolha 😎🔥  

Trabalhamos com *camisas nacionais, europeias e seleções*, qualidade top e envio rápido 🚚  

📏 Tamanhos disponíveis: *P ao 2GG*  
👕 Masculina e Feminina  

Me diga agora:
👉 Masculina ou Feminina?
👉 Qual tamanho?`
    );

    res.sendStatus(200);
  } catch (erro) {
    console.error("Erro no webhook:", erro.message);
    res.sendStatus(200);
  }
});

// ===============================
// ROTA TESTE
// ===============================
app.get("/", (req, res) => {
  res.send("Servidor online 🚀");
});

// ===============================
app.listen(PORT, () => {
  console.log("🤖 Bot TC Sports rodando na porta", PORT);
});
