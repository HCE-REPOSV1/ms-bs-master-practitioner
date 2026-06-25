import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'practitioner', name: 'practitioner_contact_point' })
export class PractitionerContactPoint {
  @PrimaryGeneratedColumn({ name: 'contact_point_id' })
  contact_point_id!: number;

  @Column({ name: 'practitioner_id' })
  practitioner_id!: number;

  @Column({ name: 'contact_system', length: 10 })
  contact_system!: string;

  @Column({ name: 'contact_value', type: 'nvarchar', length: 255 })
  contact_value!: string;

  @Column({ name: 'contact_use', length: 10, nullable: true, default: 'work' })
  contact_use?: string;

  @Column({ name: 'contact_rank', type: 'tinyint', nullable: true, default: 1 })
  contact_rank?: number;

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
