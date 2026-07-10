import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'practitioner', name: 'practitioner_address' })
export class PractitionerAddress {
  @PrimaryGeneratedColumn({ name: 'address_id' })
  address_id!: number;

  @Column({ name: 'practitioner_id' })
  practitioner_id!: number;

  @Column({ name: 'address_use', length: 10, default: 'work' })
  address_use!: string;

  @Column({ name: 'address_type', length: 10, default: 'physical' })
  address_type!: string;

  @Column({ name: 'address_text', type: 'nvarchar', length: 500, nullable: true })
  address_text?: string;

  @Column({ name: 'address_line_1', type: 'nvarchar', length: 255, nullable: true })
  address_line_1?: string;

  @Column({ name: 'address_line_2', type: 'nvarchar', length: 255, nullable: true })
  address_line_2?: string;

  @Column({ name: 'address_city', type: 'nvarchar', length: 100, nullable: true })
  address_city?: string;

  @Column({ name: 'address_district', type: 'nvarchar', length: 100, nullable: true })
  address_district?: string;

  @Column({ name: 'address_state', type: 'nvarchar', length: 100, nullable: true })
  address_state?: string;

  @Column({ name: 'address_postal_code', length: 20, nullable: true })
  address_postal_code?: string;

  @Column({ name: 'address_country', length: 3, default: 'PE' })
  address_country!: string;

  @Column({ name: 'period_start', type: 'date', nullable: true })
  period_start?: string;

  @Column({ name: 'period_end', type: 'date', nullable: true })
  period_end?: string;

  @Column({ name: 'user_create', type: 'nvarchar', length: 100 })
  user_create!: string;

  @Column({ name: 'user_modify', type: 'nvarchar', length: 100, nullable: true })
  user_modify?: string;

  @Column({ name: 'date_create', type: 'datetime2' })
  date_create!: Date;

  @Column({ name: 'date_modify', type: 'datetime2', nullable: true })
  date_modify?: Date;

  @Column({ name: 'is_active', type: 'bit', default: true })
  is_active!: boolean;
}
