import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/router";
import { AppDataSource } from "../config/db";
import { seedDatabase } from "./seeders/index";
import * as fs from "fs";
import * as path from "path";

const app = express();
dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFilePath = path.resolve(__dirname, '../.env');

// Fonction utilitaire pour mettre à jour une clé dans le fichier .env
async function updateEnvKey(key: string, value: string | boolean) {
    let envContent = '';

    if (fs.existsSync(envFilePath)) {
        envContent = fs.readFileSync(envFilePath, 'utf8');
    }

    const envLines = envContent.split('\n').filter(line => line.trim() !== '');
    const index = envLines.findIndex(line => line.startsWith(`${key}=`));

    if (index >= 0) {
        envLines[index] = `${key}=${value}`;
    } else {
        envLines.push(`${key}=${value}`);
    }

    fs.writeFileSync(envFilePath, envLines.join('\n') + '\n', 'utf8');
    dotenv.config({ override: true }); // recharge
}

async function updateDotEnvFile(value: boolean) {
    await updateEnvKey('DB_SYNCHRONIZE', value);
}

async function startServer() {
    let server: any;

    try {
        await AppDataSource.initialize();

        if (process.env.NODE_ENV === 'development') {
            try {
                await seedDatabase();
                console.log("Database seeded successfully");
            } catch (seedError) {
                console.warn("Seeding encountered errors:", seedError);
            }
        }

        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(router);

        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).send('Erreur serveur');
        });

        //  Ajout de la vérification DB_SERVEUR == 0
        // if (process.env.DB_SYNCHRONIZE === 'false' && process.env.DB_SERVEUR === '0') {
        //     console.log("DB_SYNCHRONIZE False & DB_SERVEUR == 0");
        //     await updateDotEnvFile(true);
        //     startServer();
        //     return;
        // }

        const port = process.env.DB_PORT || 3001;
        server = app.listen(port, () => {
            console.log(`Serveur running on port http://localhost:${port}`);
        });

    } catch (err: any) {
        if (err.message?.includes("Table") && err.message?.includes("already exists")) {
            console.warn("Table existing. Disabling synchronization and restarting server...");
            try {
                await updateDotEnvFile(false);
                await updateEnvKey('DB_SERVEUR', '1'); //  mise à jour de DB_SERVEUR = 1
                console.log("Updated .env: DB_SYNCHRONIZE=false, DB_SERVEUR=1");

                console.log("Restarting server...");
                startServer();
            } catch (retryError) {
                console.error("Erreur lors de la réinitialisation et redémarrage:", retryError);
                throw retryError;
            }
        } else {
            console.error("Erreur de démarrage:", err);
            throw err;
        }
    }
}

startServer();
