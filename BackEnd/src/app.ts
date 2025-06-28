import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/router";
import { AppDataSource } from "../config/db"; // Notez le chemin corrigé
import { seedDatabase } from "./seeders/index";

const app = express();
dotenv.config();

// Définir l'environnement
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

async function startServer() {
    try {
        // Initialiser la connexion à la base de données
        await AppDataSource.initialize();
        // Peuplement initial en développement
        if (process.env.NODE_ENV === 'development') {
            try {
                await seedDatabase();
                console.log("Database seeded successfully");
            } catch (seedError) {
                console.warn("Seeding encountered errors:", seedError);
            }
        }

        // Configuration de l'application Express
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(router);

        // Gestion des erreurs
        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).send('Erreur serveur');
        });

        // Démarrer le serveur
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Serveur running on port http://localhost:${port}`);
        });
    } catch (err:any) {
        if (err.message?.includes("Table") && err.message?.includes("already exists")) {
            console.warn("Table existing. Skipping initialization");
        }
        else
        {
            console.error("Erreur de démarrage:", err);
            throw err;
        // process.exit(1);
        }
        
    }
}

startServer();