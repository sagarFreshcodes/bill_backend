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
} from "typeorm";
import { Attribute } from "./attribute";

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
