import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PractitionerMedia } from '../../domain/entities/PractitionerMedia.entity';
import { PractitionerMediaRepository } from '../../domain/repositories/PractitionerMedia.repository';

@Injectable()
export class PractitionerMediaTypeOrmRepository implements PractitionerMediaRepository {
  constructor(
    @InjectRepository(PractitionerMedia)
    private readonly repo: Repository<PractitionerMedia>,
  ) {}

  findAll(): Promise<PractitionerMedia[]> { return this.repo.find({ where: { is_active: true } as any }); }
  findById(id: number): Promise<PractitionerMedia | null> {
    return this.repo.findOne({ where: { media_id: id, is_active: true } as any });
  }
  save(entity: PractitionerMedia): Promise<PractitionerMedia> { return this.repo.save(entity); }

  async update(id: number, data: Partial<PractitionerMedia>): Promise<PractitionerMedia | null> {
    await this.repo.update({ media_id: id, is_active: true } as any, data as any);
    return this.findById(id);
  }

  async setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerMedia | null> {
    await this.repo.update(id, { is_active: isActive, user_modify: userModify, date_modify: new Date() } as any);
    return this.repo.findOne({ where: { media_id: id } as any });
  }
}
