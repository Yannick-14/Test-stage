import { DataSource } from "typeorm";
import { User } from "../entity/User";
import * as bcrypt from 'bcrypt';

export async function seedUsers(dataSource: DataSource) {
    const userRepository = dataSource.getRepository(User);

    // Hasher les mots de passe avant de les stocker
    const adminPassword = await bcrypt.hash('securepassword123', 10);
    const managerPassword = await bcrypt.hash('managerpass123', 10);

    const users = [
        {
            userName: "admin",
            email: "admin@example.com",
            password: adminPassword
        },
        {
            userName: "manager",
            email: "manager@example.com",
            password: managerPassword
        }
    ];

    for (const userData of users) {
        const userExists = await userRepository.findOne({
            where: { email: userData.email }
        });

        if (!userExists) {
            const user = userRepository.create(userData);
            await userRepository.save(user);
            console.log(`Created user: ${user.userName}`);
        }
    }
}