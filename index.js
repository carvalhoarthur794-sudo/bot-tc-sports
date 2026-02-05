const axios = require("axios");
const express = require("express");

const app = express();
app.use(express.json());

// 🔴 CONFIGURAÇÃO CORRETA
const INSTANCE_ID =3EE4729C029402FF84C4EAA28CA4D533 ; // exatamente igual ao painel
const TOKEN =504EDF003887E11088F11E2D ;

app.post("/webhook", async (req, res) => {
  try {
    const msg = req.body?.text?.message;
    const phone = req.body?.phone;

    if (!msg || !phone) return res.sendStatus(200);

    await axios.post(
      `https://api.z-api.io/instances/${3EE4729C029402FF84C4EAA28CA4D533}/token/${504EDF003887E11088F11E2D}/send-text`,
      {
        phone: phone,
        message: "Oi! 👋 Seja bem-vindo à TC Sports ⚽👕"
      }
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("ERRO:", err.response?.data || err.message);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("BOT ONLINE 🚀");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
