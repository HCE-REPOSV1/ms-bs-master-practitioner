import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PractitionerService } from '../../domain/entities/PractitionerService.entity';
import { PractitionerServiceRepository } from '../../domain/repositories/PractitionerService.repository';

@Injectable()
export class PractitionerServiceTypeOrmRepository implements PractitionerServiceRepository {
  constructor(
    @InjectRepository(PractitionerService)
    private readonly repo: Repository<PractitionerService>,
  ) {}

  findAll(): Promise<PractitionerService[]> { return this.repo.find({ where: { is_active: true } as any }); }
  findById(id: number): Promise<PractitionerService | null> {
    return this.repo.findOne({ where: { practitioner_service_id: id, is_active: true } as any });
  }
  save(entity: PractitionerService): Promise<PractitionerService> { return this.repo.save(entity); }

  async setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerService | null> {
    await this.repo.update(id, { is_active: isActive, user_modify: userModify, date_modify: new Date() } as any);
    return this.repo.findOne({ where: { practitioner_service_id: id } as any });
  }
}
