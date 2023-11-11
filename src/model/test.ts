import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, EventSubscriber, Int32, IntegerType } from "typeorm"
 


@Entity()
@EventSubscriber()

export class Test {
    @PrimaryGeneratedColumn()
    id: number

    @Column( )
    Test_name: string 

    @Column()
    status: number


    @CreateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    "createdDate": Date;

    @UpdateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    "updatedDate": Date;

}


