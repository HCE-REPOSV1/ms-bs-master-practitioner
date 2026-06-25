import { PractitionerRole } from '../../domain/entities/PractitionerRole.entity';
import { PractitionerRoleRepository } from '../../domain/repositories/PractitionerRole.repository';

export class PractitionerRoleUseCase {
  constructor(private readonly repo: PractitionerRoleRepository) {}
  findAll(): Promise<PractitionerRole[]> { return this.repo.findAll(); }
  findById(id: number): Promise<PractitionerRole | null> { return this.repo.findById(id); }
  create(data: Partial<PractitionerRole>): Promise<PractitionerRole> { return this.repo.save(data as PractitionerRole); }
  update(id: number, data: Partial<PractitionerRole>): Promise<PractitionerRole> {
    return this.repo.save({ ...data, role_id: id } as PractitionerRole);
  }
  setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerRole | null> {
    return this.repo.setActive(id, isActive, userModify);
  }
}
