import { DataSource } from "typeorm";
import { Entite } from "../entity/Entite";

export async function seedEntities(dataSource: DataSource) {
    try {
        const entityRepository = dataSource.getRepository(Entite);
        
        const entities = [
            { name: "Direction Générale" },
            { name: "Ressources Humaines" },
            { name: "Informatique" },
            { name: "Comptabilité" }
        ];

        for (const entityData of entities) {
            const entityExists = await entityRepository.findOne({ where: { name: entityData.name } });
            if (!entityExists) {
                const entity = entityRepository.create(entityData);
                await entityRepository.save(entity);
                console.log(`Created entity: ${entity.name}`);
            }
        }
        return true;
    } catch (error) {
        console.error("Error seeding entities:", error);
        return false;
    }
}