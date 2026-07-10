import { PractitionerAddress } from '../entities/PractitionerAddress.entity';

export interface PractitionerAddressRepository {
  save(entity: PractitionerAddress): Promise<PractitionerAddress>;
  findById(id: number): Promise<PractitionerAddress | null>;
  findAll(): Promise<PractitionerAddress[]>;
  update(id: number, data: Partial<PractitionerAddress>): Promise<PractitionerAddress | null>;
  setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerAddress | null>;
}
