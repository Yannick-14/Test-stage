import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { UserEntity } from "./UserEntity";
import * as bcrypt from 'bcrypt';

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id_User: number;

    @Column({ type: "varchar", length: 100 })
    userName: string;

    @Column({ type: "varchar", length: 100 })
    email: string;

    @Column({ type: "varchar", length: 20 })
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