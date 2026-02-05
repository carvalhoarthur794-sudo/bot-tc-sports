const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 10000;

// 🔑 DADOS DO Z-API (Render > Environment)
const ZAPI_INSTANCE = process.env.ZAPI_INSTANCE;
const ZAPI_TOKEN = process.env.ZAPI_TOKEN;

// 🔁 ROTA PRINCIPAL (TESTE NO NAVEGADOR)
app.get("/", (req, res) => {
  res.send("🤖 Bot TC Sports ONLINE");
});

// 🔥 WEBHOOK DO WHATSAPP
app.post("/webhook", async (req, res) => {
  const data = req.body;

  try {
    const telefone = data.phone;
    const mensagem = data.text?.message?.toLowerCase();

    if (!mensagem) {
      return res.sendStatus(200);
    }

    let resposta = "⚽ Olá! Seja bem-vindo à TC Sports.\n\n";
    resposta += "Digite:\n";
    resposta += "1️⃣ Camisas de Time\n";
    resposta += "2️⃣ Seleções\n";
    resposta += "3️⃣ Tamanhos disponíveis\n";

    if (mensagem === "1") {
      resposta = "🔥 Temos todos os times do Brasil e Europa!\nQual time você procura?";
    }

    if (mensagem === "2") {
      resposta = "🌍 Temos todas as seleções!\nQual seleção você quer?";
    }

    if (mensagem === "3") {
      resposta = "📏 Trabalhamos do P ao 2GG\nMasculino e Feminino.";
    }

    await axios.post(
      `https://api.z-api.io/instances/${ZAPI_INSTANCE}/token/${ZAPI_TOKEN}/send-text`,
      {
        phone: telefone,
        message: resposta
      }
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao responder:", err.message);
    res.sendStatus(200);
  }
});

app.listen(PORT, () => {
  console.log(`🤖 Bot rodando na porta ${PORT}`);
});
