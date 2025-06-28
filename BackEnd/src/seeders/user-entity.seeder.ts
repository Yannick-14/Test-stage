import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Entite } from "../entity/Entite";
import { UserEntity } from "../entity/UserEntity";

export async function seedUserEntities(dataSource: DataSource) {
    const userEntityRepository = dataSource.getRepository(UserEntity);
    const userRepository = dataSource.getRepository(User);
    const entityRepository = dataSource.getRepository(Entite);

    const admin = await userRepository.findOne({ where: { userName: "admin" } });
    const manager = await userRepository.findOne({ where: { userName: "manager" } });

    const direction = await entityRepository.findOne({ where: { name: "Direction Générale" } });
    const rh = await entityRepository.findOne({ where: { name: "Ressources Humaines" } });

    if (admin && direction) {
        const exists = await userEntityRepository.findOne({
            where: {
                user_ID: admin,
                entity_ID: direction
            }
        });

        if (!exists) {
            const userEntity = userEntityRepository.create({
                user_ID: admin,
                entity_ID: direction
            });
            await userEntityRepository.save(userEntity);
            console.log(`Created relation: admin -> Direction Générale`);
        }
    }

    if (manager && rh) {
        const exists = await userEntityRepository.findOne({
            where: {
                user_ID: manager,
                entity_ID: rh
            }
        });

        if (!exists) {
            const userEntity = userEntityRepository.create({
                user_ID: manager,
                entity_ID: rh
            });
            await userEntityRepository.save(userEntity);
            console.log(`Created relation: manager -> Ressources Humaines`);
        }
    }
}