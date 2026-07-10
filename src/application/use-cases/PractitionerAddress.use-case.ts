import { PractitionerAddress } from '../../domain/entities/PractitionerAddress.entity';
import { PractitionerAddressRepository } from '../../domain/repositories/PractitionerAddress.repository';

export class PractitionerAddressUseCase {
  constructor(private readonly repo: PractitionerAddressRepository) {}
  findAll(): Promise<PractitionerAddress[]> { return this.repo.findAll(); }
  findById(id: number): Promise<PractitionerAddress | null> { return this.repo.findById(id); }
  create(data: Partial<PractitionerAddress>): Promise<PractitionerAddress> { return this.repo.save(data as PractitionerAddress); }
  update(id: number, data: Partial<PractitionerAddress>): Promise<PractitionerAddress | null> {
    return this.repo.update(id, data);
  }
  setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerAddress | null> {
    return this.repo.setActive(id, isActive, userModify);
  }
}
