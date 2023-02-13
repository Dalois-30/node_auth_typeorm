import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Token } from "./token.model";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;
    
    @Column({
        unique: true
    })
    public email: string;
    
    @Column()
    public birthDate: Date;

    @Column()
    public password!: string;
    
    @Column()
    public active: boolean;

    @OneToMany(() => Token, (token) => token.token)
    public tokens: Token[]

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}