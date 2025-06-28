import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Entite } from "./Entite";

@Entity("userEntity")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id_UserEntity: number;

    @ManyToOne(() => User, (user) => user.userEntities,{
        onDelete:"CASCADE"
    })
    user_ID: User;

    @ManyToOne(() => Entite, (entity) => entity.userEntities,{
        onDelete:"CASCADE"
    })
    entity_ID: Entite;
}