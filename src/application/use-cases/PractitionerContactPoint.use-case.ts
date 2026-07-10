import { PractitionerContactPoint } from '../../domain/entities/PractitionerContactPoint.entity';
import { PractitionerContactPointRepository } from '../../domain/repositories/PractitionerContactPoint.repository';

export class PractitionerContactPointUseCase {
  constructor(private readonly repo: PractitionerContactPointRepository) {}
  findAll(): Promise<PractitionerContactPoint[]> { return this.repo.findAll(); }
  findById(id: number): Promise<PractitionerContactPoint | null> { return this.repo.findById(id); }
  create(data: Partial<PractitionerContactPoint>): Promise<PractitionerContactPoint> { return this.repo.save(data as PractitionerContactPoint); }
  update(id: number, data: Partial<PractitionerContactPoint>): Promise<PractitionerContactPoint | null> {
    return this.repo.update(id, data);
  }
  setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerContactPoint | null> {
    return this.repo.setActive(id, isActive, userModify);
  }
}
