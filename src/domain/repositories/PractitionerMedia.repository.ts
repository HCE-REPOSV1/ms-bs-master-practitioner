import { PractitionerMedia } from '../entities/PractitionerMedia.entity';

export interface PractitionerMediaRepository {
  save(entity: PractitionerMedia): Promise<PractitionerMedia>;
  findById(id: number): Promise<PractitionerMedia | null>;
  findAll(): Promise<PractitionerMedia[]>;
  update(id: number, data: Partial<PractitionerMedia>): Promise<PractitionerMedia | null>;
  setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerMedia | null>;
}
