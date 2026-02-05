const express = require("express");
const app = express();

app.use(express.json());

// Webhook do WhatsApp
app.post("/webhook", (req, res) => {
  console.log("📩 Mensagem recebida:");
  console.log(req.body);

  res.sendStatus(200);
});

// Rota raiz (teste no navegador)
app.get("/", (req, res) => {
  res.send("Servidor online 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
