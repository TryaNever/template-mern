import app from "./app.js";
import connectDB from "./config/database.js";
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT_EXPRESS || 3000;

const startServer = async () => {
  try {
    // Connexion à MongoDB
    await connectDB();

    // Démarrage du serveur Express
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`serveur lancé : ${PORT}`);
    });
  } catch (error) {
    console.error("erreur au démarrage du serveur :", error.message);
    process.exit(1);
  }
};

startServer();
