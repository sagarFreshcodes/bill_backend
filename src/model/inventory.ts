import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  EventSubscriber,
  Int32,
  IntegerType, 
  JoinTable,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Attribute } from "./attribute";
import { InventoryAttributes } from "./inventoryAttributes";

@Entity()
@EventSubscriber()
export class Inventories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sql_no: string;

  @Column()
  product_name: string;

  @Column()
  product_price: string;
  @Column()
  inhouse_date: string;
  @Column()
  stock_in: string;
  @Column()
  stock_out: string;
  @Column()
  purchase_date: string;
  @Column()
  in_out_status: string;
  @Column()
  remarks: string;
  @Column()
  brand: string;
  @Column()
  model_no: string;
  @Column()
  generation: string;
  @Column()
  processor: string;
  @Column()
  status: string;
  @Column()
  inventories: string;
  @OneToMany(
    () => InventoryAttributes,
    (inventory_attribute) => inventory_attribute.inventory,
    { cascade: true, onDelete: "CASCADE", eager: true }
  )
  @JoinColumn({ name: "inventory_attribute_id" })
  "inventory_attributes": InventoryAttributes[];

  // @MstringToMstring(() => Attribute)
  // // @JoinTable()
  // @JoinTable({
  //   name: "attributes_categories",
  //   joinColumn: {
  //     name: "category_id",
  //     referencedColumnName: "id",
  //   },
  //   inverseJoinColumn: {
  //     name: "attribute_id",
  //     referencedColumnName: "id",
  //   },
  // })
  // "attributes": Attribute[];

  @CreateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
  "createdDate": Date;

  @UpdateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
  "updatedDate": Date;
}
