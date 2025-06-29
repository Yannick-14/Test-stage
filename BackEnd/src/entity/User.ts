import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { UserEntity } from "./UserEntity";
import * as bcrypt from 'bcrypt';

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id_User: number;

    @Column({ type: "varchar", length: 100 ,nullable:false,
        transformer:{
            to:(value:string)=>{
                if (typeof value !== 'string' || !value.trim()) {
                    throw new Error("Nom ne peut pas etre vide")
                }
                return value.trim();
            },
            from:(value:string)=>value
        }
    })
    userName: string;

    @Column({ type: "varchar", length: 100 ,nullable:false,unique:true,
        transformer:{
            to:(value:string)=>{
                if (typeof value !== 'string' || !value.trim()) {
                    throw new Error("email ne peut pas etre vide")
                }
                return value.trim();
            },
            from:(value:string)=>value
        }
    })
    email: string;

    @Column({ type: "varchar", length: 20 ,nullable:false,
        transformer:{
            to:(value:string)=>{
                if (typeof value !== 'string' || !value.trim()) {
                    throw new Error("Mot de passe ne peut pas etre vide")
                }
                return value.trim();
            },
            from:(value:string)=>value
        }
    })
    password: string;

    @OneToMany(() => UserEntity, (userEntity) => userEntity.user_ID,{
        cascade:true,
        onDelete:"CASCADE"
    })
    userEntities: UserEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }
}