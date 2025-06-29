import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Entite } from "./Entite";

@Entity("userEntity")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id_UserEntity: number;

    @ManyToOne(() => User, (user) => user.userEntities,{
        onDelete:"CASCADE",
        nullable:false
    })
    user_ID: User;

    @ManyToOne(() => Entite, (entity) => entity.userEntities,{
        onDelete:"CASCADE",
        nullable:false
    })
    entity_ID: Entite;
}