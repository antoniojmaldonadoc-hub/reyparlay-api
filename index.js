import axios from "axios";

export default async function handler(req, res) {
  if (req.url === "/") {
    return res.status(200).send("ReyParlay API funcionando 🔥");
  }

  if (req.url === "/odds") {
    try {
      const response = await axios.get("https://api.the-odds-api.com/v4/sports", {
        params: {
          apiKey: process.env.ODDS_API_KEY
        }
      });

      return res.status(200).json(response.data);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(404).json({ error: "Endpoint no encontrado" });
}
