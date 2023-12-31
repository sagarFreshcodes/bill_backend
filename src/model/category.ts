import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, EventSubscriber, Int32, IntegerType } from "typeorm"
 


@Entity()
@EventSubscriber()

export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column( )
    category_name: string 

    @Column()
    status: number


    @CreateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    "createdDate": Date;

    @UpdateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    "updatedDate": Date;

}


