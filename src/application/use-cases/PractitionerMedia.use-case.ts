import { PractitionerMedia } from '../../domain/entities/PractitionerMedia.entity';
import { PractitionerMediaRepository } from '../../domain/repositories/PractitionerMedia.repository';

export class PractitionerMediaUseCase {
  constructor(private readonly repo: PractitionerMediaRepository) {}
  findAll(): Promise<PractitionerMedia[]> { return this.repo.findAll(); }
  findById(id: number): Promise<PractitionerMedia | null> { return this.repo.findById(id); }
  create(data: Partial<PractitionerMedia>): Promise<PractitionerMedia> { return this.repo.save(data as PractitionerMedia); }
  update(id: number, data: Partial<PractitionerMedia>): Promise<PractitionerMedia | null> {
    return this.repo.update(id, data);
  }
  setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerMedia | null> {
    return this.repo.setActive(id, isActive, userModify);
  }
}
