import {Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./user.model";

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({name: "user"})
    user!: User;

    @Column()
    token!: string;

    @CreateDateColumn()
    created_at!: Date;

    @Column()
    expired_at!: Date;
}
