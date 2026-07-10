import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PractitionerSpecialtyMap } from '../../domain/entities/PractitionerSpecialtyMap.entity';
import { PractitionerSpecialtyMapRepository } from '../../domain/repositories/PractitionerSpecialtyMap.repository';

@Injectable()
export class PractitionerSpecialtyMapTypeOrmRepository implements PractitionerSpecialtyMapRepository {
  constructor(
    @InjectRepository(PractitionerSpecialtyMap)
    private readonly repo: Repository<PractitionerSpecialtyMap>,
  ) {}

  findAll(): Promise<PractitionerSpecialtyMap[]> { return this.repo.find({ where: { is_active: true } as any }); }
  findById(id: number): Promise<PractitionerSpecialtyMap | null> {
    return this.repo.findOne({ where: { practitioner_specialty_id: id, is_active: true } as any });
  }
  save(entity: PractitionerSpecialtyMap): Promise<PractitionerSpecialtyMap> { return this.repo.save(entity); }

  async update(id: number, data: Partial<PractitionerSpecialtyMap>): Promise<PractitionerSpecialtyMap | null> {
    await this.repo.update({ practitioner_specialty_id: id, is_active: true } as any, data as any);
    return this.findById(id);
  }

  async setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerSpecialtyMap | null> {
    await this.repo.update(id, { is_active: isActive, user_modify: userModify, date_modify: new Date() } as any);
    return this.repo.findOne({ where: { practitioner_specialty_id: id } as any });
  }
}
