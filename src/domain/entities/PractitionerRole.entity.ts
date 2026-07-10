import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'practitioner', name: 'practitioner_role' })
export class PractitionerRole {
  @PrimaryGeneratedColumn({ name: 'role_id' })
  role_id!: number;

  @Column({ name: 'role_uuid', type: 'uniqueidentifier' })
  role_uuid!: string;

  @Column({ name: 'practitioner_id' })
  practitioner_id!: number;

  @Column({ name: 'organisation_id' })
  organisation_id!: number;

  @Column({ name: 'speciality_id', type: 'smallint' })
  speciality_id!: number;

  @Column({ name: 'location_id', nullable: true })
  location_id?: number;

  @Column({ name: 'role_code', length: 50, nullable: true, default: 'doctor' })
  role_code?: string;

  @Column({ name: 'role_display', type: 'nvarchar', length: 150, nullable: true })
  role_display?: string;

  // DATE en SQL — retorna string 'YYYY-MM-DD' desde el driver mssql
  @Column({ name: 'period_start', type: 'date', nullable: true })
  period_start?: string;

  @Column({ name: 'period_end', type: 'date', nullable: true })
  period_end?: string;

  @Column({ name: 'active_fhir', type: 'bit', default: true })
  active_fhir!: boolean;

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
