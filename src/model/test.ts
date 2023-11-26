import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, EventSubscriber, Int32, IntegerType } from "typeorm"
const jsonData = '{"name": "John Doe","age": 30,"city": "Exampleville","isStudent": false,"courses": ["Mathematics", "History", "Science"],"address": {"street": "123 Main Street","zipCode": "12345","country": "Exampleland"}}'



@Entity()
@EventSubscriber()

export class Test {
    @PrimaryGeneratedColumn()
    id: number

    @Column( )
    Test_name: string 

    @Column()
    status: number

    @Column({ nullable: true, default: jsonData })
    json: string

    @CreateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    "createdDate": Date;

    @UpdateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    "updatedDate": Date;

}


