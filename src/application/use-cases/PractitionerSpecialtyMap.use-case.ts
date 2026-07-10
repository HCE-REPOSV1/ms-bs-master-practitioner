import { PractitionerSpecialtyMap } from '../../domain/entities/PractitionerSpecialtyMap.entity';
import { PractitionerSpecialtyMapRepository } from '../../domain/repositories/PractitionerSpecialtyMap.repository';

export class PractitionerSpecialtyMapUseCase {
  constructor(private readonly repo: PractitionerSpecialtyMapRepository) {}
  findAll(): Promise<PractitionerSpecialtyMap[]> { return this.repo.findAll(); }
  findById(id: number): Promise<PractitionerSpecialtyMap | null> { return this.repo.findById(id); }
  create(data: Partial<PractitionerSpecialtyMap>): Promise<PractitionerSpecialtyMap> { return this.repo.save(data as PractitionerSpecialtyMap); }
  update(id: number, data: Partial<PractitionerSpecialtyMap>): Promise<PractitionerSpecialtyMap | null> {
    return this.repo.update(id, data);
  }
  setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerSpecialtyMap | null> {
    return this.repo.setActive(id, isActive, userModify);
  }
}
