const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/proxy/goldsms", async (req, res) => {
  try {
    const response = await fetch("https://apiv3.goldmesaj.net/api/sendSMS", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const result = await response.text();
    res.status(response.status).send(result);
  } catch (err) {
    console.error("❌ Proxy hatası:", err);
    res.status(500).send("Proxy Sunucu Hatası");
  }
});

app.get("/", (req, res) => {
  res.send("✅ Render Proxy Aktif");
});

app.get("/my-ip", async (req, res) => {
  try {
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipJson = await ipResponse.json();
    res.send(`Sunucu çıkış IP adresi: ${ipJson.ip}`);
  } catch (err) {
    res.status(500).send("IP adresi alınamadı");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy çalışıyor: http://localhost:${PORT}`);
});
