import { PractitionerContactPoint } from '../entities/PractitionerContactPoint.entity';

export interface PractitionerContactPointRepository {
  save(entity: PractitionerContactPoint): Promise<PractitionerContactPoint>;
  findById(id: number): Promise<PractitionerContactPoint | null>;
  findAll(): Promise<PractitionerContactPoint[]>;
  update(id: number, data: Partial<PractitionerContactPoint>): Promise<PractitionerContactPoint | null>;
  setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerContactPoint | null>;
}
