const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
  const message = req.body.text?.message || '';
  const phone = req.body.phone;

  let reply =
    "Oi 👋 Sou o atendente da *TC SPORTS*.\n\n" +
    "Me diz o que você procura:\n" +
    "1️⃣ Times Brasileiros\n" +
    "2️⃣ Times Europeus\n" +
    "3️⃣ Seleções\n" +
    "4️⃣ Infantil";

  if (message === '1')
    reply = "⚽ *Times Brasileiros*\nFlamengo\nCorinthians\nPalmeiras\nQual você quer ver?";
  if (message === '2')
    reply = "🌍 *Times Europeus*\nReal Madrid\nBarcelona\nPSG\nQual time?";
  if (message === '3')
    reply = "🏆 *Seleções*\nBrasil\nArgentina\nFrança\nQual seleção?";
  if (message === '4')
    reply = "👕 *Infantil*\nCamisa + Short\nQual time e tamanho?";

  await axios.post(
    `https://api.z-api.io/instances/${process.env.ZAPI_INSTANCE}/token/${process.env.ZAPI_TOKEN}/send-text`,
    {
      phone,
      message: reply
    }
  );

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Bot rodando na porta ' + PORT + ' 🚀');
});
