import express from "express";
import axios from "axios";

const app = express();

// Ruta raíz para probar que la API está arriba
app.get("/", (req, res) => {
  res.send("ReyParlay API funcionando 🔥");
});

// Ruta para consultar The Odds API
app.get("/odds", async (req, res) => {
  try {
    const sport = req.query.sport || "basketball_nba"; // deporte por defecto
    const regions = req.query.regions || "us";         // región por defecto
    const markets = req.query.markets || "h2h";        // mercado por defecto

    const response = await axios.get(
      "https://api.the-odds-api.com/v4/sports/" + sport + "/odds",
      {
        params: {
          apiKey: process.env.ODDS_API_KEY,
          regions,
          markets,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error consultando The Odds API:", error?.response?.data || error.message);
    res.status(500).json({ error: "Error consultando The Odds API" });
  }
});

// 👇 IMPORTANTE: en Vercel NO usamos app.listen, solo exportamos la app
export default app;
