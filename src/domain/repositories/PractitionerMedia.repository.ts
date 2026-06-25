import { PractitionerMedia } from '../entities/PractitionerMedia.entity';

export interface PractitionerMediaRepository {
  save(entity: PractitionerMedia): Promise<PractitionerMedia>;
  findById(id: number): Promise<PractitionerMedia | null>;
  findAll(): Promise<PractitionerMedia[]>;
  setActive(id: number, isActive: boolean, userModify: string): Promise<PractitionerMedia | null>;
}
