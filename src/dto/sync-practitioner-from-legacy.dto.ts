import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString, IsNotEmpty, IsOptional, IsIn, IsBoolean, IsInt, IsDateString, MaxLength, Min,
  ValidateNested, ValidateIf, IsObject,
} from 'class-validator';

/**
 * Datos de dominio del medico, ya resueltos/mapeados por el caller
 * (ms-cnl-int-hce-integration, MedicoCdcHandler.handle()). Todos opcionales: hoy
 * MedicoCdcHandler no mapea ningun campo de negocio (dbo.medicos.nombres no tiene
 * separacion apellido/nombre, ver docstring de ese handler) — el use-case aplica
 * placeholders al crear (ver SyncPractitionerFromLegacy.use-case.ts) hasta que se
 * resuelva ese mapeo. Update es merge parcial real: solo se tocan las claves presentes.
 */
export class SyncPractitionerFromLegacyData {
  @ApiPropertyOptional({ maxLength: 100 })
  @IsOptional() @IsString() @MaxLength(100)
  ad_username?: string;

  @ApiPropertyOptional({ maxLength: 100 })
  @IsOptional() @IsString() @MaxLength(100)
  name_family?: string;

  @ApiPropertyOptional({ maxLength: 100 })
  @IsOptional() @IsString() @MaxLength(100)
  name_fathers_family?: string;

  @ApiPropertyOptional({ maxLength: 100 })
  @IsOptional() @IsString() @MaxLength(100)
  name_mothers_family?: string;

  @ApiPropertyOptional({ maxLength: 100 })
  @IsOptional() @IsString() @MaxLength(100)
  name_given?: string;

  @ApiPropertyOptional({ maxLength: 30 })
  @IsOptional() @IsString() @MaxLength(30)
  name_prefix?: string;

  @ApiPropertyOptional({ maxLength: 30 })
  @IsOptional() @IsString() @MaxLength(30)
  name_suffix?: string;

  @ApiPropertyOptional({ enum: ['male', 'female', 'other', 'unknown'] })
  @IsOptional() @IsIn(['male', 'female', 'other', 'unknown'])
  gender?: string;

  @ApiPropertyOptional({ description: 'Fecha de nacimiento ISO YYYY-MM-DD' })
  @IsOptional() @IsDateString()
  birth_date?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  active_fhir?: boolean;

  @ApiPropertyOptional({ maxLength: 10 })
  @IsOptional() @IsString() @MaxLength(10)
  communication_language?: string;

  @ApiPropertyOptional({ description: 'FK logica a catalog.practitioner_status' })
  @IsOptional() @IsInt() @Min(1)
  @Type(() => Number)
  practitioner_status_id?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  is_physician?: boolean;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  is_nurse?: boolean;
}

/**
 * Payload del receptor CDC POST /practitioner/sync — correlaciona con
 * dbo.medicos.codmedico (clinica) via legacy_practitioner_id. El caller
 * (ms-cnl-int-hce-integration) ya resolvio identidad; este endpoint solo hace upsert
 * por legacy_practitioner_id. Mismo patron que SyncEncounterFromLegacyDto en
 * ms-bs-core-encounter.
 */
export class SyncPractitionerFromLegacyDto {
  @ApiProperty({ maxLength: 50, description: 'dbo.medicos.codmedico (clinica) — clave de correlacion con el legacy' })
  @IsString() @IsNotEmpty() @MaxLength(50)
  legacy_practitioner_id!: string;

  @ApiProperty({ enum: ['c', 'u', 'd', 'r'], description: 'Operacion CDC original (create/update/delete/read-snapshot)' })
  @IsIn(['c', 'u', 'd', 'r'])
  operation!: 'c' | 'u' | 'd' | 'r';

  @ApiPropertyOptional({ type: () => SyncPractitionerFromLegacyData })
  @ValidateIf((o) => o.operation !== 'd')
  @IsObject()
  @ValidateNested()
  @Type(() => SyncPractitionerFromLegacyData)
  data?: SyncPractitionerFromLegacyData;

  @ApiProperty({ maxLength: 100, description: 'Usuario/proceso que hace el cambio, tipicamente "cdc-worker"' })
  @IsString() @IsNotEmpty() @MaxLength(100)
  user_modify!: string;
}
