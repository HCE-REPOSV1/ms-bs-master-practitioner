import { PractitionerAddress } from '../entities/PractitionerAddress.entity';

export interface PractitionerAddressRepository {
  save(entity: PractitionerAddress): Promise<PractitionerAddress>;
  findById(id: number): Promise<PractitionerAddress | null>;
  findAll(): Promise<PractitionerAddress[]>;
  setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerAddress | null>;
}
