import axios from "axios";

// Esta función es la que Vercel ejecuta en cada request
export default async function handler(req, res) {
  // Ruta principal: GET /
  if (req.method === "GET" && req.url === "/") {
    return res.status(200).send("ReyParlay API funcionando 🔥");
  }

  // Ruta para probar The Odds API: GET /odds
  if (req.method === "GET" && req.url.startsWith("/odds")) {
    try {
      const response = await axios.get("https://api.the-odds-api.com/v4/sports", {
        params: {
          apiKey: process.env.ODDS_API_KEY, // 👈 nombre de tu variable en Vercel
        },
      });

      return res.status(200).json(response.data);
    } catch (error) {
      console.error("Error consultando The Odds API:", error.message);
      return res.status(500).json({
        error: "Error consultando The Odds API",
        message: error.message,
      });
    }
  }

  // Si llega a otra ruta o método no permitido
  return res.status(404).json({ error: "Ruta no encontrada" });
}
