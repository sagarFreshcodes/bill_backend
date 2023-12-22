import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Inventories } from "./inventory";
import { Attribute } from "./attribute";

@Entity({ name: "inventoryAttributes" })
export class InventoryAttributes extends BaseEntity {
  @PrimaryGeneratedColumn()
  "id": number;

  //   @ManyToOne(() => Inventories, (inventory) => inventory.inventory_attributes, {
  //     onDelete: "CASCADE",
  //   })

  @ManyToOne(() => Inventories, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "inventory_id" })
  "inventory": Inventories;

  @ManyToOne(() => Attribute, {
    cascade: true,
    onDelete: "CASCADE",
    eager: true,
  })
  
  
  @JoinColumn({ name: "attribute_id" })
  "attribute_id": Attribute;

  @Column({ nullable: true })
  "attribute_value": String;

  @CreateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
  "createdDate": Date;

  @UpdateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
  "updatedDate": Date;
}
