const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const INSTANCE_ID = "3EE4729C029402FF84C4EAA28CA4D533";
const TOKEN = "504EDF003887E11088F11E2D";

app.post("/webhook", async (req, res) => {
  try {
    console.log("📩 BODY RECEBIDO:", req.body);

    const phone = req.body.phone;
    const message = req.body?.text?.message;

    if (!phone || !message) {
      console.log("⚠️ Dados incompletos");
      return res.sendStatus(200);
    }

    await axios.post(
      `https://api.z-api.io/instances/${3EE4729C029402FF84C4EAA28CA4D533}/token/${504EDF003887E11088F11E2D}/sendText`,
      {
        phone: phone,
        message:
          "Olá 👋\n" +
          "Seja bem-vindo à *TC Sports* ⚽👕\n\n" +
          "Trabalhamos com:\n" +
          "✔ Times do Brasil\n" +
          "✔ Times da Europa\n" +
          "✔ Seleções\n\n" +
          "Qual camisa você procura?"
      }
    );

    console.log("✅ Mensagem enviada com sucesso");
    res.sendStatus(200);
  } catch (error) {
    console.error("❌ ERRO AO RESPONDER:", error.response?.data || error.message);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("BOT ONLINE 🚀");
});

app.listen(3000, () => {
  console.log("🚀 Servidor rodando");
});
