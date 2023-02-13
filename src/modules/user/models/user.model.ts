// import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn("uuid")
//     id: string

//     @Column()
//     firstName: string

//     @Column()
//     lastName: string

//     @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
//     public created_at: Date;

//     @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
//     public updated_at: Date;
// }