import { Practitioner } from '../../domain/entities/Practitioner.entity';
import { PractitionerRepository } from '../../domain/repositories/Practitioner.repository';

export class PractitionerUseCase {
  constructor(private readonly repo: PractitionerRepository) {}
  findAll(): Promise<Practitioner[]> { return this.repo.findAll(); }
  findById(id: number): Promise<Practitioner | null> { return this.repo.findById(id); }
  create(data: Partial<Practitioner>): Promise<Practitioner> { return this.repo.save(data as Practitioner); }
  update(id: number, data: Partial<Practitioner>): Promise<Practitioner | null> {
    return this.repo.update(id, data);
  }
  setActive(id: number, isActive: boolean, userModify: string): Promise<Practitioner | null> {
    return this.repo.setActive(id, isActive, userModify);
  }
}
