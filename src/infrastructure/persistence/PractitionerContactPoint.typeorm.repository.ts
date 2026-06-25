import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PractitionerContactPoint } from '../../domain/entities/PractitionerContactPoint.entity';
import { PractitionerContactPointRepository } from '../../domain/repositories/PractitionerContactPoint.repository';

@Injectable()
export class PractitionerContactPointTypeOrmRepository implements PractitionerContactPointRepository {
  constructor(
    @InjectRepository(PractitionerContactPoint)
    private readonly repo: Repository<PractitionerContactPoint>,
  ) {}

  findAll(): Promise<PractitionerContactPoint[]> { return this.repo.find({ where: { is_active: true } as any }); }
  findById(id: number): Promise<PractitionerContactPoint | null> {
    return this.repo.findOne({ where: { contact_point_id: id, is_active: true } as any });
  }
  save(entity: PractitionerContactPoint): Promise<PractitionerContactPoint> { return this.repo.save(entity); }

  async setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerContactPoint | null> {
    await this.repo.update(id, { is_active: isActive, user_modify: userModify, date_modify: new Date() } as any);
    return this.repo.findOne({ where: { contact_point_id: id } as any });
  }
}
