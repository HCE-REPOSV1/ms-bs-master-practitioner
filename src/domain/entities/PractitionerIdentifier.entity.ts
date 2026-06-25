import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'practitioner', name: 'practitioner_identifier' })
export class PractitionerIdentifier {
  @PrimaryGeneratedColumn({ name: 'identifier_id' })
  identifier_id!: number;

  @Column({ name: 'practitioner_id' })
  practitioner_id!: number;

  // FHIR: Identifier.use — 'official' | 'temp' | 'secondary' | 'old'
  @Column({ name: 'identifier_use', length: 10, default: 'official' })
  identifier_use!: string;

  // FHIR: Identifier.type.code — 'MD' (CMP) | 'NI' (DNI) | 'PPN' (Pasaporte)
  @Column({ name: 'identifier_type_code', length: 20 })
  identifier_type_code!: string;

  @Column({ name: 'identifier_type_system', length: 255, default: 'http://terminology.hl7.org/CodeSystem/v2-0203' })
  identifier_type_system!: string;

  @Column({ name: 'identifier_type_display', type: 'nvarchar', length: 150, nullable: true })
  identifier_type_display?: string;

  @Column({ name: 'identifier_system', length: 255 })
  identifier_system!: string;

  @Column({ name: 'identifier_value', length: 100 })
  identifier_value!: string;

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
