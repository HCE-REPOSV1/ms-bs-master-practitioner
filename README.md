# ms-bs-practitioner-service

> Generado por **Jarvis Platform** — 23/4/2026

## Estrategia
BFF Negocio (Lógica de negocio)

## Stack Tecnológico
- **Runtime**: Node.js 20 + TypeScript
- **Framework**: NestJS 10
- **Arquitectura**: hexagonal
- **ORM**: typeorm
- **Auth**: none
- **API Docs**: Swagger UI (`/api/docs`)

## Dominio: hce_core

### FileServerConfig
| Campo | Tipo | Requerido |
|-------|------|----------|
| config_id | number | ✓ |
| profile_name | string | ✓ |
| base_url | string | ✓ |
| is_default | boolean | ✓ |
| config_description | string | — |
| user_create | string | ✓ |
| user_modify | string | — |
| date_create | Date | ✓ |
| date_modify | Date | — |
| is_active | boolean | ✓ |

### TenantIdentity
| Campo | Tipo | Requerido |
|-------|------|----------|
| tenant_identity_id | number | ✓ |
| tenant_uuid | string | ✓ |
| tenant_code | string | ✓ |
| tenant_name | string | ✓ |
| country_code | string | ✓ |
| timezone | string | ✓ |
| fhir_version | string | ✓ |
| environment | string | ✓ |
| system_version | string | ✓ |
| provisioned_at | Date | ✓ |
| user_create | string | ✓ |
| user_modify | string | — |
| date_create | Date | ✓ |
| date_modify | Date | — |
| is_active | boolean | ✓ |

### Organisation
| Campo | Tipo | Requerido |
|-------|------|----------|
| organisation_id | number | ✓ |
| organisation_uuid | string | ✓ |
| legacy_id | string | — |
| organisation_name | string | ✓ |
| type_code | string | — |
| type_display | string | — |
| active_fhir | boolean | ✓ |
| user_create | string | ✓ |
| user_modify | string | — |
| date_create | Date | ✓ |
| date_modify | Date | — |
| is_active | boolean | ✓ |

### Speciality
| Campo | Tipo | Requerido |
|-------|------|----------|
| speciality_id | number | ✓ |
| fhir_code | string | ✓ |
| fhir_system | string | ✓ |
| fhir_display | string | ✓ |
| local_name | string | ✓ |
| legacy_speciality_id | string | — |
| user_create | string | ✓ |
| user_modify | string | — |
| date_create | Date | ✓ |
| date_modify | Date | — |
| is_active | boolean | ✓ |

### Location
| Campo | Tipo | Requerido |
|-------|------|----------|
| location_id | number | ✓ |
| location_uuid | string | ✓ |
| organisation_id | number | ✓ |
| identifier_value | string | — |
| location_status | string | ✓ |
| location_name | string | ✓ |
| location_alias | string | — |
| location_description | string | — |
| location_mode | string | ✓ |
| type_code | string | — |
| type_display | string | — |
| physical_type_code | string | — |
| physical_type_display | string | — |
| address_line_1 | string | — |
| address_line_2 | string | — |
| address_city | string | — |
| address_district | string | — |
| address_state | string | — |
| address_postal_code | string | — |
| address_country | string | ✓ |
| position_longitude | number | — |
| position_latitude | number | — |
| telecom_phone | string | — |
| telecom_email | string | — |
| legacy_location_id | string | — |
| user_create | string | ✓ |
| user_modify | string | — |
| date_create | Date | ✓ |
| date_modify | Date | — |
| is_active | boolean | ✓ |

### Practitioner
| Campo | Tipo | Requerido |
|-------|------|----------|
| practitioner_id | number | ✓ |
| practitioner_uuid | string | ✓ |
| ad_username | string | ✓ |
| identifier_value | string | — |
| identifier_system | string | — |
| identifier_type_code | string | — |
| name_family | string | ✓ |
| name_given | string | ✓ |
| name_prefix | string | — |
| name_suffix | string | — |
| gender | string | — |
| birth_date | Date | — |
| active_fhir | boolean | ✓ |
| communication_language | string | — |
| legacy_practitioner_id | string | — |
| user_create | string | ✓ |
| user_modify | string | — |
| date_create | Date | ✓ |
| date_modify | Date | — |
| is_active | boolean | ✓ |

### PractitionerRole
| Campo | Tipo | Requerido |
|-------|------|----------|
| role_id | number | ✓ |
| role_uuid | string | ✓ |
| practitioner_id | number | ✓ |
| organisation_id | number | ✓ |
| speciality_id | number | ✓ |
| location_id | number | — |
| role_code | string | — |
| role_display | string | — |
| period_start | Date | — |
| period_end | Date | — |
| active_fhir | boolean | ✓ |
| user_create | string | ✓ |
| user_modify | string | — |
| date_create | Date | ✓ |
| date_modify | Date | — |
| is_active | boolean | ✓ |

### PractitionerAddress
| Campo | Tipo | Requerido |
|-------|------|----------|
| address_id | number | ✓ |
| practitioner_id | number | ✓ |
| address_use | string | ✓ |
| address_type | string | ✓ |
| address_text | string | — |
| address_line_1 | string | — |
| address_line_2 | string | — |
| address_city | string | — |
| address_district | string | — |
| address_state | string | — |
| address_postal_code | string | — |
| address_country | string | ✓ |
| period_start | Date | — |
| period_end | Date | — |
| user_create | string | ✓ |
| user_modify | string | — |
| date_create | Date | ✓ |
| date_modify | Date | — |
| is_active | boolean | ✓ |

### PractitionerContactPoint
| Campo | Tipo | Requerido |
|-------|------|----------|
| contact_point_id | number | ✓ |
| practitioner_id | number | ✓ |
| contact_system | string | ✓ |
| contact_value | string | ✓ |
| contact_use | string | — |
| contact_rank | number | — |
| period_start | Date | — |
| period_end | Date | — |
| user_create | string | ✓ |
| user_modify | string | — |
| date_create | Date | ✓ |
| date_modify | Date | — |
| is_active | boolean | ✓ |

### PractitionerMedia
| Campo | Tipo | Requerido |
|-------|------|----------|
| media_id | number | ✓ |
| practitioner_id | number | ✓ |
| file_server_config_id | number | ✓ |
| content_type | string | ✓ |
| media_file_name | string | ✓ |
| relative_path | string | ✓ |
| media_type | string | ✓ |
| media_title | string | — |
| file_size_bytes | number | — |
| file_hash | string | — |
| is_primary | boolean | ✓ |
| attachment_date | Date | — |
| user_create | string | ✓ |
| user_modify | string | — |
| date_create | Date | ✓ |
| date_modify | Date | — |
| is_active | boolean | ✓ |

### DomainEventOutbox
| Campo | Tipo | Requerido |
|-------|------|----------|
| event_id | number | ✓ |
| event_uuid | string | ✓ |
| event_type | string | ✓ |
| aggregate_type | string | ✓ |
| aggregate_id | string | ✓ |
| event_payload | string | ✓ |
| event_status | string | ✓ |
| occurred_at | Date | ✓ |
| processed_at | Date | — |
| retry_count | number | ✓ |
| last_error | string | — |
| user_create | string | ✓ |
| user_modify | string | — |
| date_create | Date | ✓ |
| date_modify | Date | — |
| is_active | boolean | ✓ |

### LegacySyncLog
| Campo | Tipo | Requerido |
|-------|------|----------|
| sync_log_id | number | ✓ |
| event_uuid | string | — |
| sync_direction | string | ✓ |
| entity_type | string | ✓ |
| entity_id_hce | string | — |
| entity_id_legacy | string | — |
| sync_operation | string | ✓ |
| sync_result | string | ✓ |
| result_detail | string | — |
| payload_sent | string | — |
| payload_received | string | — |
| sync_started_at | Date | ✓ |
| sync_finished_at | Date | — |
| user_create | string | ✓ |
| user_modify | string | — |
| date_create | Date | ✓ |
| date_modify | Date | — |
| is_active | boolean | ✓ |

## Endpoints

- `GET    /FileServerConfigs` — Listar
- `GET    /FileServerConfigs/:id` — Obtener
- `POST   /FileServerConfigs` — Crear
- `PUT    /FileServerConfigs/:id` — Actualizar
- `DELETE /FileServerConfigs/:id` — Eliminar
- `GET    /TenantIdentitys` — Listar
- `GET    /TenantIdentitys/:id` — Obtener
- `POST   /TenantIdentitys` — Crear
- `PUT    /TenantIdentitys/:id` — Actualizar
- `DELETE /TenantIdentitys/:id` — Eliminar
- `GET    /Organisations` — Listar
- `GET    /Organisations/:id` — Obtener
- `POST   /Organisations` — Crear
- `PUT    /Organisations/:id` — Actualizar
- `DELETE /Organisations/:id` — Eliminar
- `GET    /Specialitys` — Listar
- `GET    /Specialitys/:id` — Obtener
- `POST   /Specialitys` — Crear
- `PUT    /Specialitys/:id` — Actualizar
- `DELETE /Specialitys/:id` — Eliminar
- `GET    /Locations` — Listar
- `GET    /Locations/:id` — Obtener
- `POST   /Locations` — Crear
- `PUT    /Locations/:id` — Actualizar
- `DELETE /Locations/:id` — Eliminar
- `GET    /Practitioners` — Listar
- `GET    /Practitioners/:id` — Obtener
- `POST   /Practitioners` — Crear
- `PUT    /Practitioners/:id` — Actualizar
- `DELETE /Practitioners/:id` — Eliminar
- `GET    /PractitionerRoles` — Listar
- `GET    /PractitionerRoles/:id` — Obtener
- `POST   /PractitionerRoles` — Crear
- `PUT    /PractitionerRoles/:id` — Actualizar
- `DELETE /PractitionerRoles/:id` — Eliminar
- `GET    /PractitionerAddresss` — Listar
- `GET    /PractitionerAddresss/:id` — Obtener
- `POST   /PractitionerAddresss` — Crear
- `PUT    /PractitionerAddresss/:id` — Actualizar
- `DELETE /PractitionerAddresss/:id` — Eliminar
- `GET    /PractitionerContactPoints` — Listar
- `GET    /PractitionerContactPoints/:id` — Obtener
- `POST   /PractitionerContactPoints` — Crear
- `PUT    /PractitionerContactPoints/:id` — Actualizar
- `DELETE /PractitionerContactPoints/:id` — Eliminar
- `GET    /PractitionerMedias` — Listar
- `GET    /PractitionerMedias/:id` — Obtener
- `POST   /PractitionerMedias` — Crear
- `PUT    /PractitionerMedias/:id` — Actualizar
- `DELETE /PractitionerMedias/:id` — Eliminar
- `GET    /DomainEventOutboxs` — Listar
- `GET    /DomainEventOutboxs/:id` — Obtener
- `POST   /DomainEventOutboxs` — Crear
- `PUT    /DomainEventOutboxs/:id` — Actualizar
- `DELETE /DomainEventOutboxs/:id` — Eliminar
- `GET    /LegacySyncLogs` — Listar
- `GET    /LegacySyncLogs/:id` — Obtener
- `POST   /LegacySyncLogs` — Crear
- `PUT    /LegacySyncLogs/:id` — Actualizar
- `DELETE /LegacySyncLogs/:id` — Eliminar

## Cómo ejecutar

### Local sin Docker

Requiere acceso a SQL Server en `DB_HOST`. Si corre en tu máquina, usar `DB_HOST=localhost` en `.env`.

```bash
npm install
# Copiar .env.example a .env y completar los valores
npm run start:dev
```

### Local con Docker

Usa `docker-compose.dev.yml`, que lee el `.env` local. Si SQL Server corre en tu máquina, usar `DB_HOST=host.docker.internal`:

```bash
docker compose -f docker-compose.dev.yml build
docker compose -f docker-compose.dev.yml up -d

# O build + up en un solo comando:
docker compose -f docker-compose.dev.yml up -d --build

# Para bajar:
docker compose -f docker-compose.dev.yml down
```

### Producción

El `docker-compose.yml` lee los secretos desde Vault al arrancar. No se necesita `.env` en el servidor.

**Requisito:** Vault corriendo en `192.168.42.44:8200` (ver [HCE-vault-config](../HCE-vault-config/README.md)).

```bash
# El token está en HCE-vault-config/.env como TOKEN_PRACTITIONER_SERVICE
export VAULT_TOKEN=hvs.xxxx

docker compose down
docker compose build
docker compose up -d
```

Al arrancar, `entrypoint.sh` obtiene `DB_PASS`, `DB_HOST`, `KAFKA_BROKER` y el resto de Vault. El app no sabe que existe Vault.

Con GitHub Actions el token se pasa como variable de entorno desde GitHub Secrets (`TOKEN_PRACTITIONER_SERVICE`).

---

## Scripts disponibles

```bash
npm run start:dev   # desarrollo con hot-reload
npm run build       # compilar TypeScript
npm run start:prod  # ejecutar build
npm run test        # tests unitarios
npm run test:cov    # cobertura
```

## Swagger UI

Disponible en: `http://localhost:3000/api/docs`
