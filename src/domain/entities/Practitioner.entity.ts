import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'practitioner', name: 'practitioner' })
export class Practitioner {
  @PrimaryGeneratedColumn({ name: 'practitioner_id' })
  practitioner_id!: number;

  @Column({ name: 'practitioner_uuid', type: 'uniqueidentifier' })
  practitioner_uuid!: string;

  @Column({ name: 'ad_username', length: 100 })
  ad_username!: string;

  @Column({ name: 'name_family', type: 'nvarchar', length: 100 })
  name_family!: string;

  @Column({ name: 'name_fathers_family', type: 'nvarchar', length: 100, nullable: true })
  name_fathers_family?: string;

  @Column({ name: 'name_mothers_family', type: 'nvarchar', length: 100, nullable: true })
  name_mothers_family?: string;

  @Column({ name: 'name_given', type: 'nvarchar', length: 100 })
  name_given!: string;

  @Column({ name: 'name_prefix', type: 'nvarchar', length: 30, nullable: true })
  name_prefix?: string;

  @Column({ name: 'name_suffix', type: 'nvarchar', length: 30, nullable: true })
  name_suffix?: string;

  // Columna calculada AS en SQL Server — solo lectura
  @Column({ name: 'name_text', type: 'nvarchar', insert: false, update: false, nullable: true, select: true })
  name_text?: string;

  @Column({ name: 'gender', length: 10, nullable: true })
  gender?: string;

  @Column({ name: 'birth_date', type: 'date', nullable: true })
  birth_date?: string;

  @Column({ name: 'active_fhir', type: 'bit', default: true })
  active_fhir!: boolean;

  @Column({ name: 'communication_language', length: 10, nullable: true, default: 'es' })
  communication_language?: string;

  @Column({ name: 'legacy_practitioner_id', length: 50, nullable: true })
  legacy_practitioner_id?: string;

  // FK LOGICA a catalog.practitioner_status — resuelta por aplicacion/eventos, no por el motor (cruza de dominio)
  @Column({ name: 'practitioner_status_id', type: 'smallint', nullable: true })
  practitioner_status_id?: number;

  @Column({ name: 'is_physician', type: 'bit', default: false })
  is_physician!: boolean;

  @Column({ name: 'is_nurse', type: 'bit', default: false })
  is_nurse!: boolean;

  @Column({ name: 'source_system_code', length: 20, nullable: true })
  source_system_code?: string;

  @Column({ name: 'last_integration_datetime', type: 'datetime2', nullable: true })
  last_integration_datetime?: Date;

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
