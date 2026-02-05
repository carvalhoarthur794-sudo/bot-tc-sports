const express = require("express");
const app = express();

app.use(express.json());

// rota de teste (ESSENCIAL)
app.get("/", (req, res) => {
  res.send("Servidor online 🚀");
});

// webhook do WhatsApp
app.post("/webhook", (req, res) => {
  console.log("Mensagem recebida:", req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
