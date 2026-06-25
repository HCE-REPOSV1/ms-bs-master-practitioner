import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PractitionerAddress } from '../../domain/entities/PractitionerAddress.entity';
import { PractitionerAddressRepository } from '../../domain/repositories/PractitionerAddress.repository';

@Injectable()
export class PractitionerAddressTypeOrmRepository implements PractitionerAddressRepository {
  constructor(
    @InjectRepository(PractitionerAddress)
    private readonly repo: Repository<PractitionerAddress>,
  ) {}

  findAll(): Promise<PractitionerAddress[]> { return this.repo.find({ where: { is_active: true } as any }); }
  findById(id: number): Promise<PractitionerAddress | null> {
    return this.repo.findOne({ where: { address_id: id, is_active: true } as any });
  }
  save(entity: PractitionerAddress): Promise<PractitionerAddress> { return this.repo.save(entity); }

  async setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerAddress | null> {
    await this.repo.update(id, { is_active: isActive, user_modify: userModify, date_modify: new Date() } as any);
    return this.repo.findOne({ where: { address_id: id } as any });
  }
}
