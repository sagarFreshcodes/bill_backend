// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   BaseEntity,
//   CreateDateColumn,
//   UpdateDateColumn,
//   ManyToOne,
//   JoinColumn,
// } from "typeorm";
// import { Categories } from "./category";
// import { Attribute } from "./attribute";

// @Entity()
// export class Attributes_categories {
//   @PrimaryGeneratedColumn()
//   "id": number;

//   @ManyToOne(() => Categories, { cascade: true, onDelete: "CASCADE" })
//   @JoinColumn({ name: "category_id" })
//   "category": Categories;

//   @ManyToOne(() => Attribute, { cascade: true, onDelete: "CASCADE" })
//   @JoinColumn({ name: "attribute_id" })
//   "attribute": Attribute;

//   @CreateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
//   "createdDate": Date;

//   @UpdateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
//   "updatedDate": Date;
// }
