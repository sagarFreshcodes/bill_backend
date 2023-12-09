import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, EventSubscriber, Int32, IntegerType, ManyToMany, JoinTable } from "typeorm"
import { Category } from "./category";



@Entity()
@EventSubscriber()

export class Attribute {
    @PrimaryGeneratedColumn()
    "id": number

    // @Column()
    // "category_id": string 

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

    // @ManyToMany(() => Category  )
    // @JoinTable(    {
    //     name: "attributes_categories",
    //     joinColumn: {
    //       name: "attribute_id",
    //       referencedColumnName: "id"
    //     },
    //     inverseJoinColumn: {
    //       name: "category_id",
    //       referencedColumnName: "id"
    //     }
    //   })
    // "categories": Category[];

    @ManyToMany(() => Category)
    @JoinTable({
        name: "attributes_categories",
        joinColumn: {
            name: "attribute_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "category_id",
            referencedColumnName: "id"
        }
    })
    // @JoinTable()
    categories: Category[]

    @CreateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    "createdDate": Date;

    @UpdateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    "updatedDate": Date;

}


