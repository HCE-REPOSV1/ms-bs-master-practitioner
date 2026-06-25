import { PractitionerIdentifier } from '../entities/PractitionerIdentifier.entity';

export interface PractitionerIdentifierRepository {
  save(entity: PractitionerIdentifier): Promise<PractitionerIdentifier>;
  findById(id: number): Promise<PractitionerIdentifier | null>;
  findAll(): Promise<PractitionerIdentifier[]>;
  setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerIdentifier | null>;
}
