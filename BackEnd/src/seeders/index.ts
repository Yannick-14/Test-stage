import { AppDataSource } from "../../config/db";
import { seedEntities } from "./entity.seeder";
import { seedUsers } from "./user.seeder";
import { seedUserEntities } from "./user-entity.seeder";

export async function seedDatabase() {
    try {
        console.log("Starting database seeding...");
        
        // Vérifiez si la connexion est déjà initialisée
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        // Obtenez directement le Repository depuis AppDataSource
        await seedEntities(AppDataSource);
        await seedUsers(AppDataSource);
        await seedUserEntities(AppDataSource);

        console.log("Seeding completed successfully!");
        return true;
    } catch (error) {
        console.error("Error during seeding:", error);
        return false;
    }
}