import { PractitionerIdentifier } from '../entities/PractitionerIdentifier.entity';

export interface PractitionerIdentifierRepository {
  save(entity: PractitionerIdentifier): Promise<PractitionerIdentifier>;
  findById(id: number): Promise<PractitionerIdentifier | null>;
  findAll(): Promise<PractitionerIdentifier[]>;
  update(id: number, data: Partial<PractitionerIdentifier>): Promise<PractitionerIdentifier | null>;
  setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerIdentifier | null>;
}
