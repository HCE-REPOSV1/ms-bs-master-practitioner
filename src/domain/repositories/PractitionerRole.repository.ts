import { PractitionerRole } from '../entities/PractitionerRole.entity';

export interface PractitionerRoleRepository {
  save(entity: PractitionerRole): Promise<PractitionerRole>;
  findById(id: number): Promise<PractitionerRole | null>;
  findAll(): Promise<PractitionerRole[]>;
  setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerRole | null>;
}
