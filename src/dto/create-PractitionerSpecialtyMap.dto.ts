import { IsString, IsNotEmpty, IsOptional, MaxLength, IsInt, Min, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreatePractitionerSpecialtyMapDto {
  @ApiProperty({ description: 'FK a practitioner.practitioner' })
  @IsInt() @Min(1)
  @Type(() => Number)
  practitioner_id!: number;

  @ApiProperty({ description: 'FK logica a catalog.speciality' })
  @IsInt() @Min(1)
  @Type(() => Number)
  speciality_id!: number;

  @ApiPropertyOptional({ default: false, description: 'Especialidad principal del practitioner' })
  @IsOptional() @IsBoolean()
  is_primary?: boolean;

  @ApiProperty({ maxLength: 100 })
  @IsString() @IsNotEmpty() @MaxLength(100)
  user_create!: string;
}
