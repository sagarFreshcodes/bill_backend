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
import { Attribute } from "./attribute";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column({ nullable: true })
  "salutation": string;

  @Column({ nullable: true })
  "first_name": string;

  @Column({ nullable: true })
  "last_name": string;

  @Column({ nullable: true })
  "company_name": string;

  @Column({ nullable: true })
  "customer_display_name": string;

  @Column({ nullable: true })
  "work_phone": string;

  @Column({ nullable: true })
  "mobile": string;
  @Column({ nullable: true })
  "website": string;

  @Column({ nullable: true })
  "address_line_1": string;

  @Column({ nullable: true })
  "address_line_2": string;

  @Column({ nullable: true })
  "country_id": string;

  @Column({ nullable: true })
  "country": string;

  @Column({ nullable: true })
  "state_id": string;

  @Column({ nullable: true })
  "state": string;

  @Column({ nullable: true })
  "city_id": string;

  @Column({ nullable: true })
  "city": string;

  @Column({ nullable: true })
  "area": string;

  @Column({ nullable: true })
  "area_id": string;

  @Column({ nullable: true })
  "pincode": string;

  @Column({ nullable: true })
  "shipping_address_line_1": string;

  @Column({ nullable: true })
  "shipping_address_line_2": string;

  @Column({ nullable: true })
  "shipping_country_id": string;

  @Column({ nullable: true })
  "shipping_country": string;

  @Column({ nullable: true })
  "shipping_state_id": string;

  @Column({ nullable: true })
  "shipping_state": string;

  @Column({ nullable: true })
  "shipping_city": string;

  @Column({ nullable: true })
  "shipping_city_id": string;

  @Column({ nullable: true })
  "shipping_area": string;

  @Column({ nullable: true })
  "shipping_area_id": string;

  @Column({ nullable: true })
  "shipping_pincode": string;

  @Column({ nullable: true })
  "pan_card_no": string;

  @Column({ nullable: true })
  "aadhaar_card_no": string;

  @Column({ nullable: true })
  "gst_no": string;

  @Column({ nullable: true })
  "status": string;

  @Column({ nullable: true })
  "contact": string;

  @Column({ nullable: true }) // 0-customer 1-vendor
  "type": string;

  @CreateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
  "createdDate": Date;

  @UpdateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
  "updatedDate": Date;
}
