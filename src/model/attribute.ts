import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, EventSubscriber, Int32, IntegerType } from "typeorm"



@Entity()
@EventSubscriber()

export class Attribute {
    @PrimaryGeneratedColumn()
    "id": number

    @Column()
    "category_id": string 

    @Column({ nullable: true })
    "name": String;

    @Column({ nullable: true })
    "is_field": String;

    @Column({ nullable: true })
    "is_require": boolean;

    @Column()
    "status": Number

    @Column()
    "position": Number


    @CreateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    "createdDate": Date;

    @UpdateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    "updatedDate": Date;

}


