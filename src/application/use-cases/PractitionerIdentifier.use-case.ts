import { PractitionerIdentifier } from '../../domain/entities/PractitionerIdentifier.entity';
import { PractitionerIdentifierRepository } from '../../domain/repositories/PractitionerIdentifier.repository';

export class PractitionerIdentifierUseCase {
  constructor(private readonly repo: PractitionerIdentifierRepository) {}
  findAll(): Promise<PractitionerIdentifier[]> { return this.repo.findAll(); }
  findById(id: number): Promise<PractitionerIdentifier | null> { return this.repo.findById(id); }
  create(data: Partial<PractitionerIdentifier>): Promise<PractitionerIdentifier> { return this.repo.save(data as PractitionerIdentifier); }
  update(id: number, data: Partial<PractitionerIdentifier>): Promise<PractitionerIdentifier | null> {
    return this.repo.update(id, data);
  }
  setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerIdentifier | null> {
    return this.repo.setActive(id, isActive, userModify);
  }
}
