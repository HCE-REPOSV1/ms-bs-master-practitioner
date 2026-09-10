import { randomUUID } from 'crypto';
import { Practitioner } from '../../domain/entities/Practitioner.entity';
import { PractitionerRepository } from '../../domain/repositories/Practitioner.repository';
import { SyncPractitionerFromLegacyDto } from '../../dto/sync-practitioner-from-legacy.dto';

/**
 * Receptor del ultimo tramo del pipeline CDC clinica -> HCE_CORE_V2 para dbo.medicos:
 * upsert por legacy_practitioner_id, sin logica de transformacion de negocio (eso ya lo
 * hizo ms-cnl-int-hce-integration antes de llamar aca). Mismo patron que
 * SyncEncounterFromLegacyUseCase en ms-bs-core-encounter.
 *
 * A diferencia de encounter/triage (que reciben siempre el objeto completo), MedicoCdcHandler
 * hoy no mapea ningun campo de negocio (ver su docstring) — por eso, a diferencia de
 * SyncEncounterFromLegacyUseCase, este use-case hace MERGE PARCIAL real en update (solo
 * toca las claves presentes en dto.data, igual que SyncPatientFromLegacyUseCase en
 * ms-bs-master-patient) y aplica placeholders de creacion sensatos para las columnas
 * NOT NULL que MedicoCdcHandler todavia no resuelve (ad_username/name_family/name_given).
 * Estos placeholders quedan documentados como pendientes de correccion una vez que se
 * defina como partir dbo.medicos.nombres.
 *
 * Anti-loop: practitioner.practitioner NO tiene sync_echo_token todavia (no hay sync
 * reverso HCE_CORE_V2 -> clinica disenado para esta tabla) — no se graba nada en
 * integration.sync_echo_ledger, a diferencia de encounter/triage.
 */
export class SyncPractitionerFromLegacyUseCase {
  constructor(private readonly repo: PractitionerRepository) {}

  async sync(dto: SyncPractitionerFromLegacyDto): Promise<Practitioner | null> {
    const existing = await this.repo.findByLegacyPractitionerId(dto.legacy_practitioner_id);

    if (dto.operation === 'd') {
      // TODO(sync-delete-gap): que significa "borrar" un medico en HCE_CORE_V2 es una
      // decision de producto pendiente (mismo gap que encounter/triage). Por ahora, si
      // existe, solo se desactiva; si no existe, no hay nada que hacer.
      if (!existing) return null;
      return this.repo.setActive(existing.practitioner_id, false, dto.user_modify);
    }

    const data = dto.data ?? {};

    if (existing) {
      // Merge parcial: solo se incluyen las claves presentes en data (undefined se
      // excluye del objeto para no pisar valores ya cargados por un evento anterior u otra
      // via de ingreso).
      const patch: Partial<Practitioner> = {
        user_modify: dto.user_modify,
        date_modify: new Date(),
      };
      if (data.ad_username !== undefined) patch.ad_username = data.ad_username;
      if (data.name_family !== undefined) patch.name_family = data.name_family;
      if (data.name_fathers_family !== undefined) patch.name_fathers_family = data.name_fathers_family;
      if (data.name_mothers_family !== undefined) patch.name_mothers_family = data.name_mothers_family;
      if (data.name_given !== undefined) patch.name_given = data.name_given;
      if (data.name_prefix !== undefined) patch.name_prefix = data.name_prefix;
      if (data.name_suffix !== undefined) patch.name_suffix = data.name_suffix;
      if (data.gender !== undefined) patch.gender = data.gender;
      if (data.birth_date !== undefined) patch.birth_date = data.birth_date;
      if (data.active_fhir !== undefined) patch.active_fhir = data.active_fhir;
      if (data.communication_language !== undefined) patch.communication_language = data.communication_language;
      if (data.practitioner_status_id !== undefined) patch.practitioner_status_id = data.practitioner_status_id;
      if (data.is_physician !== undefined) patch.is_physician = data.is_physician;
      if (data.is_nurse !== undefined) patch.is_nurse = data.is_nurse;

      return this.repo.update(existing.practitioner_id, patch);
    }

    // Placeholder de creacion: ad_username/name_family/name_given son NOT NULL pero
    // MedicoCdcHandler todavia no los resuelve (ver docstring de la clase) — se usa el
    // codigo legacy como placeholder visible/buscable en vez de un valor generico, para que
    // el registro sea identificable en pantalla hasta que se corrija el mapeo real.
    const toCreate: Partial<Practitioner> = {
      practitioner_uuid: randomUUID(),
      legacy_practitioner_id: dto.legacy_practitioner_id,
      ad_username: data.ad_username ?? `sic-${dto.legacy_practitioner_id}`,
      name_family: data.name_family ?? `(pendiente sync ${dto.legacy_practitioner_id})`,
      name_fathers_family: data.name_fathers_family,
      name_mothers_family: data.name_mothers_family,
      name_given: data.name_given ?? '(pendiente sync)',
      name_prefix: data.name_prefix,
      name_suffix: data.name_suffix,
      gender: data.gender,
      birth_date: data.birth_date,
      active_fhir: data.active_fhir ?? true,
      communication_language: data.communication_language ?? 'es',
      practitioner_status_id: data.practitioner_status_id,
      is_physician: data.is_physician ?? false,
      is_nurse: data.is_nurse ?? false,
      source_system_code: 'SIC',
      last_integration_datetime: new Date(),
      is_active: true,
      user_create: dto.user_modify,
      date_create: new Date(),
    };
    return this.repo.save(toCreate as Practitioner);
  }
}
