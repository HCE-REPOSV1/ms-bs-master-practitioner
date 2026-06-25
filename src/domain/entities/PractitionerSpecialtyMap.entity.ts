import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'practitioner', name: 'practitioner_specialty_map' })
export class PractitionerSpecialtyMap {
  @PrimaryGeneratedColumn({ name: 'practitioner_specialty_id' })
  practitioner_specialty_id!: number;

  @Column({ name: 'practitioner_specialty_uuid', type: 'uniqueidentifier' })
  practitioner_specialty_uuid!: string;

  @Column({ name: 'practitioner_id' })
  practitioner_id!: number;

  // FK LOGICA a catalog.speciality — resuelta por aplicacion/eventos, no por el motor (cruza de dominio)
  @Column({ name: 'speciality_id', type: 'smallint' })
  speciality_id!: number;

  @Column({ name: 'is_primary', type: 'bit', default: false })
  is_primary!: boolean;

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
