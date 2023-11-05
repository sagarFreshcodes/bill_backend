import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, EventSubscriber } from "typeorm"
const bcrypt = require("bcryptjs");


@Entity()
@EventSubscriber()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_name: string

    @Column()
    email: string

    @Column()
    password: string

    // @BeforeInsert()
    // async hashPassword() {
    //     console.log('test===================lll>', this.password);
    //     if (this.password) this.password = await bcrypt.hash(this.password, 10);
    // }

    @Column()
    role: string

    @Column()
    status: string


    @CreateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    "createdDate": Date;

    @UpdateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    "updatedDate": Date;

}


