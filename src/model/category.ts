import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, EventSubscriber, Int32, IntegerType, ManyToMany, JoinTable } from "typeorm"
import { Attribute } from "./attribute";
 


@Entity()
@EventSubscriber()

export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column( )
    category_name: string 

    @Column()
    status: number 

    // @ManyToMany(() => Attribute, attribute => attribute.categories)
    // @JoinTable(   {
    //     name: "attributes_categories",
    //     joinColumn: {
    //       name: "category_id",
    //       referencedColumnName: "id"
    //     },
    //     inverseJoinColumn: {
    //       name: "attribute_id",
    //       referencedColumnName: "id"
    //     }
    //   })
    // "attributes": Attribute[];
 
    @ManyToMany(() => Attribute )
    @JoinTable()
    "attributes": Attribute[];

    @CreateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    "createdDate": Date;

    @UpdateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    "updatedDate": Date;

}


