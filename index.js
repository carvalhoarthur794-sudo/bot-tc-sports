const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// ROTA DE TESTE (abre no navegador)
app.get("/", (req, res) => {
  res.send("✅ Bot TC Sports ONLINE");
});

// 🔥 WEBHOOK DO Z-API (ESSA É A CHAVE)
app.post("/webhook", (req, res) => {
  console.log("🔥 WEBHOOK RECEBIDO DO Z-API");
  console.log(JSON.stringify(req.body, null, 2));

  // aqui depois entra a lógica do bot
  res.sendStatus(200);
});

// PORTA (Render usa essa)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🤖 Bot TC Sports rodando na porta ${PORT}`);
});
