import { PractitionerService } from '../entities/PractitionerService.entity';

export interface PractitionerServiceRepository {
  save(entity: PractitionerService): Promise<PractitionerService>;
  findById(id: number): Promise<PractitionerService | null>;
  findAll(): Promise<PractitionerService[]>;
  update(id: number, data: Partial<PractitionerService>): Promise<PractitionerService | null>;
  setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerService | null>;
}
