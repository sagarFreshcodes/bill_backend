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
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Attribute } from "./attribute";
import { InventoryAttributes } from "./inventoryAttributes";
import { Categories } from "./category";
import { Customer } from "./customer";
import { Hsn } from "./hsn";
import { Companies } from "./company";

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

  @ManyToOne(() => Companies, {
    eager: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "company_id" })
  "company_id": Companies;

  @ManyToOne(() => Customer, {
    cascade: true,
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "vendor_id" })
  "vendor_id": Customer;

  @OneToOne(() => Hsn, { cascade: true, onDelete: "CASCADE", eager: true })
  @JoinColumn({ name: "hsn_id" })
  "hsn": Hsn;
  // @Column()
  // company_id: string;

  // @Column()
  // vendor_id: string;
  // @Column()
  // hsn: string;

  @ManyToOne(() => Categories, {
    cascade: true,
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "category_id" })
  "category_id": Categories;

  @CreateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
  "createdDate": Date;

  @UpdateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
  "updatedDate": Date;
}
