import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../src/entity/User";
import { Entite } from "../src/entity/Entite";
import { UserEntity } from "../src/entity/UserEntity";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Entite, User, UserEntity],
    // synchronize: true,
    logging: true,
    migrations: [],
});