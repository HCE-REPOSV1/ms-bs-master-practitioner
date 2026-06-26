import { IsString, IsNotEmpty, IsOptional, IsIn, MaxLength, IsBoolean, IsInt, Min, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreatePractitionerDto {
  @ApiProperty({ description: 'AD username del medico (viene del token AD)', maxLength: 100 })
  @IsString() @IsNotEmpty() @MaxLength(100)
  ad_username!: string;

  @ApiProperty({ maxLength: 100 })
  @IsString() @IsNotEmpty() @MaxLength(100)
  name_family!: string;

  @ApiPropertyOptional({ maxLength: 100, description: 'Apellido paterno (extension FHIR)' })
  @IsOptional() @IsString() @MaxLength(100)
  name_fathers_family?: string;

  @ApiPropertyOptional({ maxLength: 100, description: 'Apellido materno (extension FHIR)' })
  @IsOptional() @IsString() @MaxLength(100)
  name_mothers_family?: string;

  @ApiProperty({ maxLength: 100 })
  @IsString() @IsNotEmpty() @MaxLength(100)
  name_given!: string;

  @ApiPropertyOptional({ maxLength: 30, example: 'Dr.' })
  @IsOptional() @IsString() @MaxLength(30)
  name_prefix?: string;

  @ApiPropertyOptional({ maxLength: 30, example: 'PhD' })
  @IsOptional() @IsString() @MaxLength(30)
  name_suffix?: string;

  @ApiPropertyOptional({ enum: ['male', 'female', 'other', 'unknown'] })
  @IsOptional() @IsIn(['male', 'female', 'other', 'unknown'])
  gender?: string;

  @ApiPropertyOptional({ description: 'Fecha de nacimiento ISO YYYY-MM-DD', example: '1980-05-15' })
  @IsOptional() @IsString()
  birth_date?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional() @IsBoolean()
  active_fhir?: boolean;

  @ApiPropertyOptional({ maxLength: 10, default: 'es', example: 'es' })
  @IsOptional() @IsString() @MaxLength(10)
  communication_language?: string;

  @ApiPropertyOptional({ maxLength: 50 })
  @IsOptional() @IsString() @MaxLength(50)
  legacy_practitioner_id?: string;

  @ApiPropertyOptional({ description: 'FK logica a catalog.practitioner_status' })
  @IsOptional() @IsInt() @Min(1)
  @Type(() => Number)
  practitioner_status_id?: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional() @IsBoolean()
  is_physician?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional() @IsBoolean()
  is_nurse?: boolean;

  @ApiPropertyOptional({ maxLength: 20, description: 'Codigo del sistema de origen (sync legacy)' })
  @IsOptional() @IsString() @MaxLength(20)
  source_system_code?: string;

  @ApiPropertyOptional({ description: 'Fecha/hora de la ultima sincronizacion con el sistema legacy' })
  @IsOptional() @IsDateString()
  last_integration_datetime?: string;

  @ApiProperty({ maxLength: 100, description: 'Usuario que crea el registro' })
  @IsString() @IsNotEmpty() @MaxLength(100)
  user_create!: string;
}
