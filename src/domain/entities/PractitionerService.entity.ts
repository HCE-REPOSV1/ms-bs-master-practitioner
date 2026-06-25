import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'practitioner', name: 'practitioner_service' })
export class PractitionerService {
  @PrimaryGeneratedColumn({ name: 'practitioner_service_id' })
  practitioner_service_id!: number;

  @Column({ name: 'practitioner_service_uuid', type: 'uniqueidentifier' })
  practitioner_service_uuid!: string;

  @Column({ name: 'practitioner_id' })
  practitioner_id!: number;

  // Sin catalogo formal — VARCHAR libre (deuda tecnica ya documentada en V2)
  @Column({ name: 'service_code', length: 20 })
  service_code!: string;

  @Column({ name: 'service_name', type: 'nvarchar', length: 100, nullable: true })
  service_name?: string;

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
