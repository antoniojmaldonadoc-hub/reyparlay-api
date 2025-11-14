import express from "express";
import axios from "axios";

const app = express();

app.get("/", (req, res) => {
  res.send("ReyParlay API funcionando 🔥");
});

// Ruta de prueba para consultar The Odds API
app.get("/odds", async (req, res) => {
  try {
    const response = await axios.get("https://api.the-odds-api.com/v4/sports", {
      params: {
        apiKey: process.env.ODDS_API_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Puerto local (no usado por Vercel)
app.listen(3000, () => console.log("API funcionando en localhost:3000"));
