import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Practitioner } from '../../domain/entities/Practitioner.entity';
import {
  PractitionerRepository,
  PractitionerByAdUsernameResult,
  PractitionerByUuidResult,
  PractitionerBySpecialityResult,
  PractitionerContactAndAddressResult,
} from '../../domain/repositories/Practitioner.repository';

@Injectable()
export class PractitionerTypeOrmRepository implements PractitionerRepository {
  constructor(
    @InjectRepository(Practitioner)
    private readonly repo: Repository<Practitioner>,
    private readonly dataSource: DataSource,
  ) {}

  findAll(): Promise<Practitioner[]> { return this.repo.find({ where: { is_active: true } as any }); }
  findById(id: number): Promise<Practitioner | null> {
    return this.repo.findOne({ where: { practitioner_id: id, is_active: true } as any });
  }
  save(entity: Practitioner): Promise<Practitioner> { return this.repo.save(entity); }

  async update(id: number, data: Partial<Practitioner>): Promise<Practitioner | null> {
    await this.repo.update({ practitioner_id: id, is_active: true } as any, data as any);
    return this.findById(id);
  }

  async setActive(id: number, isActive: boolean, userModify: string): Promise<Practitioner | null> {
    await this.repo.update(id, { is_active: isActive, user_modify: userModify, date_modify: new Date() } as any);
    return this.repo.findOne({ where: { practitioner_id: id } as any });
  }

  async findByAdUsername(adUsername: string, locale: string): Promise<PractitionerByAdUsernameResult | null> {
    const rows = await this.dataSource.query<PractitionerByAdUsernameResult[]>(`
      SELECT
          p.practitioner_uuid,
          p.ad_username,
          p.name_prefix,
          p.name_given,
          p.name_family,
          p.name_text,
          p.gender,
          ISNULL(tgender_loc.value, ISNULL(tgender_es.value, gender_v.display)) AS gender_display,
          p.communication_language,
          pr.role_id,
          pr.role_uuid,
          pr.role_code,
          pr.role_display,
          pr.period_start             AS role_period_start,
          pr.period_end               AS role_period_end,
          s.speciality_id,
          s.fhir_code                 AS speciality_fhir_code,
          s.fhir_display              AS speciality_fhir_display,
          s.local_name                AS speciality_local_name,
          o.organisation_uuid,
          o.organisation_name,
          l.location_uuid,
          l.location_name,
          l.location_alias,
          l.address_city              AS location_city,
          l.address_district          AS location_district,
          l.telecom_phone             AS location_phone,
          m.media_id,
          m.media_file_name           AS photo_file_name,
          m.content_type              AS photo_content_type,
          fs.base_url + m.relative_path AS photo_url
      FROM practitioner.practitioner              p
      INNER JOIN practitioner.practitioner_role   pr ON pr.practitioner_id = p.practitioner_id AND pr.is_active = 1
      INNER JOIN catalog.speciality               s  ON s.speciality_id    = pr.speciality_id  AND s.is_active  = 1
      INNER JOIN organisation.organisation        o  ON o.organisation_id  = pr.organisation_id AND o.is_active = 1
      LEFT JOIN  organisation.location            l  ON l.location_id      = pr.location_id    AND l.is_active  = 1
      LEFT JOIN  practitioner.practitioner_media  m  ON m.practitioner_id  = p.practitioner_id AND m.is_primary = 1 AND m.is_active = 1
      LEFT JOIN  cfg.file_server_config           fs ON fs.config_id       = m.file_server_config_id AND fs.is_active = 1
      LEFT JOIN  catalog.code_system              cs_gender ON cs_gender.code_system_code = 'GENDER'
      LEFT JOIN  catalog.code_system_value        gender_v ON gender_v.code_system_id = cs_gender.code_system_id AND gender_v.code = p.gender AND gender_v.is_active = 1
      LEFT JOIN  catalog.translation              tgender_loc ON tgender_loc.entity_schema = 'catalog' AND tgender_loc.entity_table = 'code_system_value'
        AND tgender_loc.entity_id = gender_v.value_id AND tgender_loc.field_name = 'display' AND tgender_loc.locale = @1 AND tgender_loc.is_active = 1
      LEFT JOIN  catalog.translation              tgender_es ON tgender_es.entity_schema = 'catalog' AND tgender_es.entity_table = 'code_system_value'
        AND tgender_es.entity_id = gender_v.value_id AND tgender_es.field_name = 'display' AND tgender_es.locale = 'es' AND tgender_es.is_active = 1
      WHERE p.ad_username = @0 AND p.is_active = 1
    `, [adUsername, locale]);
    const row = rows[0] ?? null;
    return row ? { ...row, speciality_display: this.resolveByLocale(row.speciality_local_name, row.speciality_fhir_display, locale) } : null;
  }

  async findByUuid(practitionerUuid: string, locale: string): Promise<PractitionerByUuidResult | null> {
    const rows = await this.dataSource.query<PractitionerByUuidResult[]>(`
      SELECT
          p.practitioner_uuid,
          p.ad_username,
          p.name_prefix,
          p.name_given,
          p.name_family,
          p.name_text,
          p.gender,
          ISNULL(tgender_loc.value, ISNULL(tgender_es.value, gender_v.display)) AS gender_display,
          p.birth_date,
          p.communication_language,
          p.active_fhir,
          pr.role_uuid,
          pr.role_code,
          pr.role_display,
          pr.period_start         AS role_period_start,
          pr.period_end           AS role_period_end,
          s.fhir_code             AS speciality_fhir_code,
          s.fhir_display          AS speciality_fhir_display,
          s.local_name            AS speciality_local_name,
          o.organisation_uuid,
          o.organisation_name,
          m.media_file_name       AS photo_file_name,
          m.content_type          AS photo_content_type,
          fs.base_url + m.relative_path AS photo_url
      FROM practitioner.practitioner              p
      INNER JOIN practitioner.practitioner_role   pr ON pr.practitioner_id = p.practitioner_id AND pr.is_active = 1
      INNER JOIN catalog.speciality               s  ON s.speciality_id    = pr.speciality_id  AND s.is_active  = 1
      INNER JOIN organisation.organisation        o  ON o.organisation_id  = pr.organisation_id AND o.is_active = 1
      LEFT JOIN  practitioner.practitioner_media  m  ON m.practitioner_id  = p.practitioner_id AND m.is_primary = 1 AND m.is_active = 1
      LEFT JOIN  cfg.file_server_config           fs ON fs.config_id       = m.file_server_config_id AND fs.is_active = 1
      LEFT JOIN  catalog.code_system              cs_gender ON cs_gender.code_system_code = 'GENDER'
      LEFT JOIN  catalog.code_system_value        gender_v ON gender_v.code_system_id = cs_gender.code_system_id AND gender_v.code = p.gender AND gender_v.is_active = 1
      LEFT JOIN  catalog.translation              tgender_loc ON tgender_loc.entity_schema = 'catalog' AND tgender_loc.entity_table = 'code_system_value'
        AND tgender_loc.entity_id = gender_v.value_id AND tgender_loc.field_name = 'display' AND tgender_loc.locale = @1 AND tgender_loc.is_active = 1
      LEFT JOIN  catalog.translation              tgender_es ON tgender_es.entity_schema = 'catalog' AND tgender_es.entity_table = 'code_system_value'
        AND tgender_es.entity_id = gender_v.value_id AND tgender_es.field_name = 'display' AND tgender_es.locale = 'es' AND tgender_es.is_active = 1
      WHERE p.practitioner_uuid = @0 AND p.is_active = 1
    `, [practitionerUuid, locale]);
    const row = rows[0] ?? null;
    return row ? { ...row, speciality_display: this.resolveByLocale(row.speciality_local_name, row.speciality_fhir_display, locale) } : null;
  }

  async findBySpeciality(specialityId: number | undefined, localName: string | undefined, locale: string): Promise<PractitionerBySpecialityResult[]> {
    const rows = await this.dataSource.query<PractitionerBySpecialityResult[]>(`
      SELECT
          p.practitioner_uuid,
          p.name_prefix,
          p.name_given,
          p.name_family,
          p.name_text,
          s.speciality_id,
          s.local_name            AS speciality_local_name,
          s.fhir_display          AS speciality_fhir_display,
          o.organisation_uuid,
          o.organisation_name,
          pr.role_code,
          pr.period_start         AS role_period_start,
          pr.period_end           AS role_period_end,
          m.media_file_name       AS photo_file_name,
          fs.base_url + m.relative_path AS photo_url
      FROM practitioner.practitioner              p
      INNER JOIN practitioner.practitioner_role   pr ON pr.practitioner_id = p.practitioner_id AND pr.is_active = 1
      INNER JOIN catalog.speciality               s  ON s.speciality_id    = pr.speciality_id  AND s.is_active  = 1
      INNER JOIN organisation.organisation        o  ON o.organisation_id  = pr.organisation_id AND o.is_active = 1
      LEFT JOIN  practitioner.practitioner_media  m  ON m.practitioner_id  = p.practitioner_id AND m.is_primary = 1 AND m.is_active = 1
      LEFT JOIN  cfg.file_server_config           fs ON fs.config_id       = m.file_server_config_id AND fs.is_active = 1
      WHERE p.is_active = 1 AND p.active_fhir = 1
        AND (@0 IS NULL OR s.speciality_id = @0)
        AND (@1 IS NULL OR s.local_name LIKE '%' + @1 + '%')
      ORDER BY s.local_name, p.name_family, p.name_given
    `, [specialityId ?? null, localName ?? null]);
    return rows.map((row) => ({ ...row, speciality_display: this.resolveByLocale(row.speciality_local_name, row.speciality_fhir_display, locale) }));
  }

  /** Fallback locale -> 'es' -> el otro idioma, mismo criterio de TranslationEnricher.attach(..., locale). */
  private resolveByLocale(es: string | null, en: string | null, locale: string): string | null {
    if (locale === 'en') return en ?? es ?? null;
    return es ?? en ?? null;
  }

  async findContactAndAddress(practitionerUuid: string): Promise<PractitionerContactAndAddressResult> {
    const [contacts, addresses] = await Promise.all([
      this.dataSource.query(`
        SELECT
            p.practitioner_uuid,
            p.name_text,
            cp.contact_point_id,
            cp.contact_system,
            cp.contact_value,
            cp.contact_use,
            cp.contact_rank,
            cp.period_start AS contact_period_start,
            cp.period_end   AS contact_period_end
        FROM practitioner.practitioner p
        INNER JOIN practitioner.practitioner_contact_point cp
               ON cp.practitioner_id = p.practitioner_id AND cp.is_active = 1
        WHERE p.practitioner_uuid = @0 AND p.is_active = 1
        ORDER BY cp.contact_system, cp.contact_rank
      `, [practitionerUuid]),
      this.dataSource.query(`
        SELECT
            p.practitioner_uuid,
            a.address_id,
            a.address_use,
            a.address_type,
            a.address_line_1,
            a.address_line_2,
            a.address_city,
            a.address_district,
            a.address_state,
            a.address_postal_code,
            a.address_country,
            a.address_text,
            a.period_start AS address_period_start,
            a.period_end   AS address_period_end
        FROM practitioner.practitioner p
        INNER JOIN practitioner.practitioner_address a
               ON a.practitioner_id = p.practitioner_id AND a.is_active = 1
        WHERE p.practitioner_uuid = @0 AND p.is_active = 1
        ORDER BY a.address_use
      `, [practitionerUuid]),
    ]);
    return { contacts, addresses };
  }
}
