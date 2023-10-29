import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"



@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_name: string  

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    roleId: string    

    @Column()
    status: string

    @Column()
    remember_token: string

    @CreateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    "createdDate": Date;

    @UpdateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    "updatedDate": Date;

}


