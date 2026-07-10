import { PractitionerService } from '../../domain/entities/PractitionerService.entity';
import { PractitionerServiceRepository } from '../../domain/repositories/PractitionerService.repository';

export class PractitionerServiceUseCase {
  constructor(private readonly repo: PractitionerServiceRepository) {}
  findAll(): Promise<PractitionerService[]> { return this.repo.findAll(); }
  findById(id: number): Promise<PractitionerService | null> { return this.repo.findById(id); }
  create(data: Partial<PractitionerService>): Promise<PractitionerService> { return this.repo.save(data as PractitionerService); }
  update(id: number, data: Partial<PractitionerService>): Promise<PractitionerService | null> {
    return this.repo.update(id, data);
  }
  setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerService | null> {
    return this.repo.setActive(id, isActive, userModify);
  }
}
