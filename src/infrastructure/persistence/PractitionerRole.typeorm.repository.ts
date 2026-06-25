import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PractitionerRole } from '../../domain/entities/PractitionerRole.entity';
import { PractitionerRoleRepository } from '../../domain/repositories/PractitionerRole.repository';

@Injectable()
export class PractitionerRoleTypeOrmRepository implements PractitionerRoleRepository {
  constructor(
    @InjectRepository(PractitionerRole)
    private readonly repo: Repository<PractitionerRole>,
  ) {}

  findAll(): Promise<PractitionerRole[]> { return this.repo.find({ where: { is_active: true } as any }); }
  findById(id: number): Promise<PractitionerRole | null> {
    return this.repo.findOne({ where: { role_id: id, is_active: true } as any });
  }
  save(entity: PractitionerRole): Promise<PractitionerRole> { return this.repo.save(entity); }

  async setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerRole | null> {
    await this.repo.update(id, { is_active: isActive, user_modify: userModify, date_modify: new Date() } as any);
    return this.repo.findOne({ where: { role_id: id } as any });
  }
}
