import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity("Entite")
export class Entite {
    @PrimaryGeneratedColumn()
    id_Entity: number;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @OneToMany(() => UserEntity, (userEntity) => userEntity.entity_ID,{
        cascade:true,
        onDelete:"CASCADE"
    })
    userEntities: UserEntity[];
}