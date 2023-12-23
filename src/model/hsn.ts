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
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity()
@EventSubscriber()
export class Hsn {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column()
  "hsn_code": string;

  @Column()
  "description": string;

  @CreateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
  "createdDate": Date;

  @UpdateDateColumn({ nullable: true })
  "updatedDate": Date;
}
