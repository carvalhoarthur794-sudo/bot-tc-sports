require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 10000;
const ZAPI_URL = "https://api.z-api.io/instances";
const INSTANCE_ID = process.env.ZAPI_INSTANCE_ID;
const TOKEN = process.env.ZAPI_TOKEN;
const SITE = process.env.SITE_URL;

// webhook
app.post("/webhook", async (req, res) => {
  const data = req.body;

  if (!data.message || !data.phone) {
    return res.sendStatus(200);
  }

  const msg = data.message.text?.toLowerCase() || "";
  const phone = data.phone;

  let reply = "";

  // BOAS-VINDAS
  if (msg.includes("oi") || msg.includes("olá")) {
    reply =
      "👋 Fala! Seja bem-vindo à *TC Sports* ⚽🔥\n\n" +
      "Trabalhamos com:\n" +
      "🇧🇷 Times do Brasil\n" +
      "🌍 Times da Europa\n" +
      "🏆 Seleções\n\n" +
      "👉 Masculina e feminina\n👉 Tamanhos do P ao 2GG\n\n" +
      "Me diga:\n1️⃣ Time\n2️⃣ Tamanho\n3️⃣ Masculina ou feminina";
  }

  // TAMANHOS
  else if (msg.includes("tamanho")) {
    reply =
      "📏 Temos todos os tamanhos:\n" +
      "P • M • G • GG • 2GG\n\n" +
      "Qual time você procura?";
  }

  // PREÇO
  else if (msg.includes("preço") || msg.includes("valor")) {
    reply =
      "💰 Trabalhamos com excelente custo-benefício!\n" +
      "Qualidade top + entrega rápida 🚀\n\n" +
      "Me diga o time que eu já te envio o link certinho 👇";
  }

  // DÚVIDA / LINK SITE
  else if (msg.includes("ver") || msg.includes("site") || msg.includes("modelo")) {
    reply =
      "Perfeito 👌\n" +
      "Você pode ver todos os modelos aqui:\n\n" +
      `🛒 ${SITE}\n\n` +
      "Se quiser, me diga o time que eu já te mando direto na camisa 😉";
  }

  // PADRÃO
  else {
    reply =
      "⚽ Me conta rapidinho:\n" +
      "👉 Qual time você quer?\n" +
      "👉 Tamanho (P ao 2GG)\n" +
      "👉 Masculina ou feminina\n\n" +
      "Eu te ajudo agora 💪";
  }

  await axios.post(
    `${ZAPI_URL}/${INSTANCE_ID}/token/${TOKEN}/send-text`,
    {
      phone,
      message: reply
    }
  );

  res.sendStatus(200);
});

// rota teste
app.get("/", (req, res) => {
  res.send("Bot TC Sports online 🚀");
});

app.listen(PORT, () => {
  console.log(`🤖 Bot TC Sports rodando na porta ${PORT}`);
});
