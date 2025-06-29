import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity("Entite")
// @Unique(["name"])
export class Entite {
    @PrimaryGeneratedColumn()
    id_Entity: number;

    @Column({ 
        type: "varchar", length: 100,nullable:false,unique:true,
        transformer:{
            to:(value:string)=>{
                if (typeof value !== 'string' || !value.trim()) {
                    throw new Error("Le nom ne peut pas etre vide")
                }
                return value.trim();
            },
            from:(value:string)=>value
        }
     })
    name: string;

    @OneToMany(() => UserEntity, (userEntity) => userEntity.entity_ID,{
        cascade:true,
        onDelete:"CASCADE"
    })
    userEntities: UserEntity[];
}