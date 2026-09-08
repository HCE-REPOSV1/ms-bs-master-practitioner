# ms-ms-bs-master-practitioner

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

## Dominio

Este microservicio (nombre interno `ms-bs-practitioner-service`) implementa el submódulo `practitioner`
del esquema `hce_core`: gestiona el **profesional de salud** (`Practitioner`, con sus flags FHIR
`is_physician`/`is_nurse` y el login por AD `ad_username`) y sus entidades hijas — direcciones, puntos de
contacto, identificadores (DNI/CMP/RNE), archivos multimedia, roles asignados por sede/especialidad,
servicios/departamentos y el mapeo de especialidades. No expone ni persiste localmente ninguna otra
entidad de `hce_core` (`Location`, `Organisation`, `Speciality`, etc.) — `organisation_id`, `location_id`,
`speciality_id` y `file_server_config_id` son solo IDs foráneos hacia otros microservicios/catálogos del
dominio, sin relación TypeORM ni tabla local aquí.

### Practitioner
| Campo | Tipo | Requerido |
|-------|------|----------|
| practitioner_id | number | ✓ |
| practitioner_uuid | string | ✓ |
| ad_username | string | ✓ |
| name_family | string | ✓ |
| name_fathers_family | string | — |
| name_mothers_family | string | — |
| name_given | string | ✓ |
| name_prefix | string | — |
| name_suffix | string | — |
| name_text | string | — (columna calculada en BD, solo lectura) |
| gender | string | — |
| birth_date | string (`date`) | — |
| active_fhir | boolean | ✓ |
| communication_language | string | — (default `es`) |
| legacy_practitioner_id | string | — |
| practitioner_status_id | number | — (FK lógica a `catalog.practitioner_status`, resuelta por aplicación) |
| is_physician | boolean | ✓ |
| is_nurse | boolean | ✓ |
| source_system_code | string | — |
| last_integration_datetime | Date | — |
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
| address_use | string | ✓ (default `work`) |
| address_type | string | ✓ (default `physical`) |
| address_text | string | — |
| address_line_1 | string | — |
| address_line_2 | string | — |
| address_city | string | — |
| address_district | string | — |
| address_state | string | — |
| address_postal_code | string | — |
| address_country | string | ✓ (default `PE`) |
| period_start | string (`date`) | — |
| period_end | string (`date`) | — |
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
| contact_use | string | — (default `work`) |
| contact_rank | number | — (default `1`) |
| period_start | string (`date`) | — |
| period_end | string (`date`) | — |
| user_create | string | ✓ |
| user_modify | string | — |
| date_create | Date | ✓ |
| date_modify | Date | — |
| is_active | boolean | ✓ |

### PractitionerIdentifier
| Campo | Tipo | Requerido |
|-------|------|----------|
| identifier_id | number | ✓ |
| practitioner_id | number | ✓ |
| identifier_use | string | ✓ (default `official`, FHIR `Identifier.use`) |
| identifier_type_code | string | ✓ (`DN` \| `CMP` \| `RNE`, CHECK constraint en BD) |
| identifier_type_system | string | ✓ (default `http://terminology.hl7.org/CodeSystem/v2-0203`) |
| identifier_type_display | string | — |
| identifier_system | string | ✓ |
| identifier_value | string | ✓ |
| period_start | string (`date`) | — |
| period_end | string (`date`) | — |
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
| fhir_status | string | ✓ (default `completed`) |
| fhir_media_type | string | ✓ (default `image`) |
| media_category | string | ✓ (default `profile_photo`) |
| content_type | string | ✓ (default `image/jpeg`) |
| media_file_name | string | ✓ |
| relative_path | string | ✓ |
| media_title | string | — |
| file_size_bytes | string (`bigint`) | — |
| file_hash | string | — |
| hash_algorithm | string | — (default `SHA-256`) |
| width_pixels | number | — |
| height_pixels | number | — |
| is_primary | boolean | ✓ |
| attachment_date | Date | — |
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
| role_code | string | — (default `doctor`) |
| role_display | string | — |
| period_start | string (`date`) | — |
| period_end | string (`date`) | — |
| active_fhir | boolean | ✓ |
| user_create | string | ✓ |
| user_modify | string | — |
| date_create | Date | ✓ |
| date_modify | Date | — |
| is_active | boolean | ✓ |

### PractitionerService
| Campo | Tipo | Requerido |
|-------|------|----------|
| practitioner_service_id | number | ✓ |
| practitioner_service_uuid | string | ✓ |
| practitioner_id | number | ✓ |
| service_code | string | ✓ (sin catálogo formal — varchar libre, deuda técnica ya documentada en V2) |
| service_name | string | — |
| user_create | string | ✓ |
| user_modify | string | — |
| date_create | Date | ✓ |
| date_modify | Date | — |
| is_active | boolean | ✓ |

### PractitionerSpecialtyMap
| Campo | Tipo | Requerido |
|-------|------|----------|
| practitioner_specialty_id | number | ✓ |
| practitioner_specialty_uuid | string | ✓ |
| practitioner_id | number | ✓ |
| speciality_id | number | ✓ (FK lógica a `catalog.speciality`, resuelta por aplicación) |
| is_primary | boolean | ✓ |
| user_create | string | ✓ |
| user_modify | string | — |
| date_create | Date | ✓ |
| date_modify | Date | — |
| is_active | boolean | ✓ |

## Endpoints

> Rutas reales con prefijo global `api` + versión: `/api/v1/...` (`app.setGlobalPrefix('api', { exclude: ['health'] })`
> + `app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1', prefix: 'v' })` en `main.ts`).
> `/health` está excluido del prefijo `api` y es version-neutral. Ningún controller usa `@UseGuards`.

### Practitioner — `/practitioner`
- `GET    /practitioner` — Buscar todos los practitioners activos
- `GET    /practitioner/by-id/:id` — Buscar practitioner activo por id numérico interno
- `POST   /practitioner` — Crear practitioner
- `PUT    /practitioner/by-id/:id` — Actualizar practitioner
- `PATCH  /practitioner/by-id/:id/estado` — Cambiar estado (activar/desactivar) de un practitioner
- `GET    /practitioner/by-username/:adUsername` — Obtener practitioner por AD username (Home login)
- `GET    /practitioner/by-speciality?specialityId=&localName=` — Listar médicos por especialidad
- `GET    /practitioner/:uuid/contact-and-address` — Obtener contactos y direcciones de un médico (FHIR UUID)
- `GET    /practitioner/:uuid` — Obtener practitioner por UUID FHIR

### PractitionerAddress — `/practitioner/addresses`
- `GET    /practitioner/addresses` — Buscar todas las direcciones activas
- `GET    /practitioner/addresses/:id` — Buscar dirección activa por id
- `POST   /practitioner/addresses` — Crear dirección de practitioner
- `PUT    /practitioner/addresses/:id` — Actualizar dirección de practitioner
- `PATCH  /practitioner/addresses/:id/estado` — Cambiar estado (activar/desactivar) de una dirección

### PractitionerContactPoint — `/practitioner/contact-points`
- `GET    /practitioner/contact-points` — Buscar todos los contactos activos
- `GET    /practitioner/contact-points/:id` — Buscar contacto activo por id
- `POST   /practitioner/contact-points` — Crear contacto de practitioner
- `PUT    /practitioner/contact-points/:id` — Actualizar contacto de practitioner
- `PATCH  /practitioner/contact-points/:id/estado` — Cambiar estado (activar/desactivar) de un contacto

### PractitionerIdentifier — `/practitioner/identifiers`
- `GET    /practitioner/identifiers` — Buscar todos los identificadores activos
- `GET    /practitioner/identifiers/:id` — Buscar identificador activo por id
- `POST   /practitioner/identifiers` — Crear identificador de practitioner (CMP/DNI/pasaporte)
- `PUT    /practitioner/identifiers/:id` — Actualizar identificador de practitioner
- `PATCH  /practitioner/identifiers/:id/estado` — Cambiar estado (activar/desactivar) de un identificador

### PractitionerMedia — `/practitioner/media`
- `GET    /practitioner/media` — Buscar toda la metadata de media activa (el archivo binario lo sirve `ms-tch-media`)
- `GET    /practitioner/media/:id` — Buscar metadata de media activa por id
- `POST   /practitioner/media` — Registrar metadata de un archivo de practitioner
- `PUT    /practitioner/media/:id` — Actualizar metadata de un archivo de practitioner
- `PATCH  /practitioner/media/:id/estado` — Cambiar estado (activar/desactivar) de un archivo

### PractitionerRole — `/practitioner/roles`
- `GET    /practitioner/roles` — Buscar todos los roles activos
- `GET    /practitioner/roles/:id` — Buscar rol activo por id
- `POST   /practitioner/roles` — Crear rol de practitioner
- `PUT    /practitioner/roles/:id` — Actualizar rol de practitioner
- `PATCH  /practitioner/roles/:id/estado` — Cambiar estado (activar/desactivar) de un rol

### PractitionerService — `/practitioner/services`
- `GET    /practitioner/services` — Buscar todos los servicios/departamentos activos del practitioner
- `GET    /practitioner/services/:id` — Buscar servicio activo por id
- `POST   /practitioner/services` — Asignar servicio/departamento a un practitioner
- `PUT    /practitioner/services/:id` — Actualizar servicio/departamento del practitioner
- `PATCH  /practitioner/services/:id/estado` — Cambiar estado (activar/desactivar) de un servicio

### PractitionerSpecialtyMap — `/practitioner/specialty-map`
- `GET    /practitioner/specialty-map` — Buscar todas las especialidades activas asignadas a practitioners
- `GET    /practitioner/specialty-map/:id` — Buscar asignación de especialidad activa por id
- `POST   /practitioner/specialty-map` — Asignar especialidad (credencial) a un practitioner
- `PUT    /practitioner/specialty-map/:id` — Actualizar asignación de especialidad del practitioner
- `PATCH  /practitioner/specialty-map/:id/estado` — Cambiar estado (activar/desactivar) de una asignación de especialidad

### Health
- `GET    /health` — Health check (version-neutral, sin prefijo `/api`)

## Cómo ejecutar

### Local sin Docker

Requiere acceso a SQL Server en `DB_HOST`. Si corre en tu máquina, usar `DB_HOST=localhost` en `.env`.

```bash
npm install
# Copiar .env.example a .env y completar los valores
npm run start:dev
```

Swagger disponible en `http://localhost:10405/api/docs` (solo fuera de producción).

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

### Producción (con Vault)

El `docker-compose.yml` lee los secretos directamente de Vault al arrancar. **No se necesita `.env`.**

**Requisito:** Vault corriendo (ver [HCE-vault-config](../HCE-vault-config/README.md)).

#### Paso 1 — Obtener el token

El archivo `HCE-vault-config/.env` tiene la línea:
```
TOKEN_PRACTITIONER_SERVICE=hvs.CAESIDsn...
```
Copia ese valor.

#### Paso 2 — Crear `.env.docker` con el token

Este archivo tiene **una sola línea** con el token de bootstrap. No contiene secretos de la app — esos vienen del vault.

**PowerShell (Windows):**
```powershell
"VAULT_TOKEN=hvs.CAESIDsn..." | Out-File -Encoding utf8 .env.docker
```

**Bash / Linux / Mac:**
```bash
echo "VAULT_TOKEN=hvs.CAESIDsn..." > .env.docker
```

> `.env.docker` está en `.gitignore` — nunca se commitea.
> Si el init regenera los tokens, actualizar este archivo con el nuevo valor de `TOKEN_PRACTITIONER_SERVICE`.

#### Paso 3 — Levantar

```bash
docker compose down
docker compose build
docker compose up -d
```

Funciona igual en PowerShell, CMD y bash — sin exportar nada.

Al arrancar, `entrypoint.sh` se conecta al Vault con ese token (secret path `hce/nestjs/bs-master-practitioner`),
descarga todos los secretos (`DB_PASS`, `DB_HOST`, `KAFKA_BROKER`, etc.) y los inyecta como variables de
entorno en el contenedor. La aplicación no sabe que existe Vault.

Con GitHub Actions el token se pasa automáticamente desde GitHub Secrets (`TOKEN_PRACTITIONER_SERVICE`).

---

## Scripts disponibles

```bash
npm run start:dev   # desarrollo con hot-reload
npm run build       # compilar TypeScript
npm run start:prod  # ejecutar build
```
