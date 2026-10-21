import dotenv from 'dotenv'
import app from './app.js'
import connectDB from './config/database.js'

dotenv.config()
const PORT = process.env.PORT_EXPRESS || 3000

const startServer = async () => {
    try {
        if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
            throw new Error('JWT_SECRET doit contenir au moins 32 caractères')
        }

        // Connexion à MongoDB
        await connectDB()

        // Démarrage du serveur Express
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Serveur lancé sur le port ${PORT}`)
        })
    } catch (error) {
        console.error('Erreur au démarrage du serveur :', error.message)
        process.exit(1)
    }
}

startServer()
