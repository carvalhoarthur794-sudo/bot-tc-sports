const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// ROTA DE TESTE (abre no navegador)
app.get("/", (req, res) => {
  res.send("✅ Bot TC Sports ONLINE");
});

// WEBHOOK DO Z-API
app.post("/webhook", async (req, res) => {
  console.log("🔥 WEBHOOK RECEBIDO");
  console.log(JSON.stringify(req.body, null, 2));

  const message = req.body?.text?.message;
  const phone = req.body?.phone;

  if (!message || !phone) {
    return res.sendStatus(200);
  }

  // RESPOSTA SIMPLES
  if (message.toLowerCase() === "oi") {
    await axios.post(
      `https://api.z-api.io/instances/${process.env.ZAPI_INSTANCE}/token/${process.env.ZAPI_TOKEN}/send-text`,
      {
        phone: phone,
        message: "Olá 👋 Bem-vindo à TC Sports ⚽🔥"
      },
      {
        headers: {
          "Client-Token": process.env.ZAPI_CLIENT_TOKEN
        }
      }
    );
  }

  res.sendStatus(200);
});

// PORTA (RENDER USA AUTOMÁTICO)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Bot TC Sports rodando na porta ${PORT}`);
});
