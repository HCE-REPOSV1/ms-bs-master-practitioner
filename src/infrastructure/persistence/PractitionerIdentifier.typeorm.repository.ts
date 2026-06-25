import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PractitionerIdentifier } from '../../domain/entities/PractitionerIdentifier.entity';
import { PractitionerIdentifierRepository } from '../../domain/repositories/PractitionerIdentifier.repository';

@Injectable()
export class PractitionerIdentifierTypeOrmRepository implements PractitionerIdentifierRepository {
  constructor(
    @InjectRepository(PractitionerIdentifier)
    private readonly repo: Repository<PractitionerIdentifier>,
  ) {}

  findAll(): Promise<PractitionerIdentifier[]> { return this.repo.find({ where: { is_active: true } as any }); }
  findById(id: number): Promise<PractitionerIdentifier | null> {
    return this.repo.findOne({ where: { identifier_id: id, is_active: true } as any });
  }
  save(entity: PractitionerIdentifier): Promise<PractitionerIdentifier> { return this.repo.save(entity); }

  async setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerIdentifier | null> {
    await this.repo.update(id, { is_active: isActive, user_modify: userModify, date_modify: new Date() } as any);
    return this.repo.findOne({ where: { identifier_id: id } as any });
  }
}
