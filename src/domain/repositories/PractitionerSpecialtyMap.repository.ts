import { PractitionerSpecialtyMap } from '../entities/PractitionerSpecialtyMap.entity';

export interface PractitionerSpecialtyMapRepository {
  save(entity: PractitionerSpecialtyMap): Promise<PractitionerSpecialtyMap>;
  findById(id: number): Promise<PractitionerSpecialtyMap | null>;
  findAll(): Promise<PractitionerSpecialtyMap[]>;
  update(id: number, data: Partial<PractitionerSpecialtyMap>): Promise<PractitionerSpecialtyMap | null>;
  setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerSpecialtyMap | null>;
}
