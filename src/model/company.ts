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
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
@EventSubscriber()
export class Companies {
  @PrimaryGeneratedColumn()
  "id": Number;

  @Column({ nullable: true })
  "company_name": string;

  // @ManyToOne(() => ServiceType, { cascade: true, onDelete: "CASCADE" })
  // @JoinColumn({ name: "service_type_id" })
  // "service_type_id": ServiceType;

  @Column({ nullable: true })
  "service_type_id": string;

  @Column({ nullable: true })
  "logo": string;

  @Column({ nullable: true })
  "primary_email": string;

  @Column({ nullable: true })
  "primary_contact": string;

  @Column({ nullable: true })
  "secondary_contact": string;

  @Column({ nullable: true })
  "secondary_email": string;

  @Column({ nullable: true })
  "whatsapp_no": string;

  @Column({ nullable: true })
  "address_line_1": string;

  @Column({ nullable: true })
  "address_line_2": string;

  @Column({ nullable: true })
  "address_line_3": string;

  @Column({ nullable: true })
  "shipping_address_line_1": string;
  @Column({ nullable: true })
  "shipping_address_line_2": string;
  @Column({ nullable: true })
  "shipping_address_line_3": string;

  @Column({ nullable: true })
  "city_id": string;
  @Column({ nullable: true })
  "city": string;
  @Column({ nullable: true })
  "state_id": string;
  @Column({ nullable: true })
  "state": string;
  @Column({ nullable: true })
  "country_id": string;
  @Column({ nullable: true })
  "shipping_state_id": string;
  @Column({ nullable: true })
  "shipping_country_id": string;
  @Column({ nullable: true })
  "country": string;

  @Column({ nullable: true })
  "pincode": string;

  @Column({ nullable: true })
  "shipping_city": string;

  @Column({ nullable: true })
  "shipping_state": string;

  @Column({ nullable: true })
  "shipping_country": string;

  @Column({ nullable: true })
  "shipping_pincode": string;

  @Column({ nullable: true })
  "cst_no": string;

  @Column({ nullable: true })
  "cst_date": string;

  @Column({ nullable: true })
  "ecc_no": string;

  @Column({ nullable: true })
  "ecc_date": string;

  @Column({ nullable: true })
  "tan_no": string;

  @Column({ nullable: true })
  "gst_no": string;

  @Column({ nullable: true })
  "bank_name": string;

  @Column({ nullable: true })
  "acc_no": string;

  @Column({ nullable: true })
  "ifsc_code": string;

  @Column({ nullable: true })
  "branch_name": string;

  @Column({ nullable: true })
  "account_name": string;

  @Column({ nullable: true })
  "status": string;

  @CreateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
  "createdDate": Date;

  @UpdateDateColumn({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
  "updatedDate": Date;
}
