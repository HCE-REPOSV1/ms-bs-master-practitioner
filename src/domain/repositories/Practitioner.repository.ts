import { Practitioner } from '../entities/Practitioner.entity';

export interface PractitionerByAdUsernameResult {
  practitioner_uuid: string;
  ad_username: string;
  name_prefix: string | null;
  name_given: string;
  name_family: string;
  name_text: string | null;
  gender: string | null;
  /** Texto de catalog.code_system_value (code_system GENDER) resuelto en el locale pedido, fallback a 'es'. */
  gender_display: string | null;
  communication_language: string | null;
  role_id: number;
  role_uuid: string;
  role_code: string;
  role_display: string;
  role_period_start: Date | null;
  role_period_end: Date | null;
  speciality_id: number;
  speciality_fhir_code: string | null;
  speciality_fhir_display: string | null;
  speciality_local_name: string;
  /** Especialidad resuelta segun locale (fallback a es) — deriva de speciality_local_name/speciality_fhir_display. */
  speciality_display: string | null;
  organisation_uuid: string;
  organisation_name: string;
  location_uuid: string | null;
  location_name: string | null;
  location_alias: string | null;
  location_city: string | null;
  location_district: string | null;
  location_phone: string | null;
  media_id: number | null;
  photo_file_name: string | null;
  photo_content_type: string | null;
  photo_url: string | null;
}

export interface PractitionerByUuidResult {
  practitioner_uuid: string;
  ad_username: string;
  name_prefix: string | null;
  name_given: string;
  name_family: string;
  name_text: string | null;
  gender: string | null;
  /** Texto de catalog.code_system_value (code_system GENDER) resuelto en el locale pedido, fallback a 'es'. */
  gender_display: string | null;
  birth_date: Date | null;
  communication_language: string | null;
  active_fhir: boolean;
  role_uuid: string;
  role_code: string;
  role_display: string;
  role_period_start: Date | null;
  role_period_end: Date | null;
  speciality_fhir_code: string | null;
  speciality_fhir_display: string | null;
  speciality_local_name: string;
  /** Especialidad resuelta segun locale (fallback a es) — deriva de speciality_local_name/speciality_fhir_display. */
  speciality_display: string | null;
  organisation_uuid: string;
  organisation_name: string;
  photo_file_name: string | null;
  photo_content_type: string | null;
  photo_url: string | null;
}

export interface PractitionerBySpecialityResult {
  practitioner_uuid: string;
  name_prefix: string | null;
  name_given: string;
  name_family: string;
  name_text: string | null;
  speciality_id: number;
  speciality_local_name: string;
  speciality_fhir_display: string | null;
  /** Especialidad resuelta segun locale (fallback a es) — deriva de speciality_local_name/speciality_fhir_display. */
  speciality_display: string | null;
  organisation_uuid: string;
  organisation_name: string;
  role_code: string;
  role_period_start: Date | null;
  role_period_end: Date | null;
  photo_file_name: string | null;
  photo_url: string | null;
}

export interface PractitionerContactAndAddressResult {
  contacts: ContactPointResult[];
  addresses: AddressResult[];
}

export interface ContactPointResult {
  practitioner_uuid: string;
  name_text: string | null;
  contact_point_id: number;
  contact_system: string;
  contact_value: string;
  contact_use: string | null;
  contact_rank: number | null;
  contact_period_start: Date | null;
  contact_period_end: Date | null;
}

export interface AddressResult {
  practitioner_uuid: string;
  address_id: number;
  address_use: string | null;
  address_type: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  address_city: string | null;
  address_district: string | null;
  address_state: string | null;
  address_postal_code: string | null;
  address_country: string | null;
  address_text: string | null;
  address_period_start: Date | null;
  address_period_end: Date | null;
}

export interface PractitionerRepository {
  save(entity: Practitioner): Promise<Practitioner>;
  findById(id: number): Promise<Practitioner | null>;
  findAll(): Promise<Practitioner[]>;
  update(id: number, data: Partial<Practitioner>): Promise<Practitioner | null>;
  setActive(id: number, isActive: boolean, userModify: string): Promise<Practitioner | null>;
  findByAdUsername(adUsername: string, locale: string): Promise<PractitionerByAdUsernameResult | null>;
  findByUuid(practitionerUuid: string, locale: string): Promise<PractitionerByUuidResult | null>;
  findBySpeciality(specialityId: number | undefined, localName: string | undefined, locale: string): Promise<PractitionerBySpecialityResult[]>;
  findContactAndAddress(practitionerUuid: string): Promise<PractitionerContactAndAddressResult>;
}
