import { IsString, IsNotEmpty, IsOptional, MaxLength, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreatePractitionerServiceDto {
  @ApiProperty({ description: 'FK a practitioner.practitioner' })
  @IsInt() @Min(1)
  @Type(() => Number)
  practitioner_id!: number;

  @ApiProperty({ maxLength: 20, description: 'Codigo de servicio (sin catalogo formal)' })
  @IsString() @IsNotEmpty() @MaxLength(20)
  service_code!: string;

  @ApiPropertyOptional({ maxLength: 100 })
  @IsOptional() @IsString() @MaxLength(100)
  service_name?: string;

  @ApiProperty({ maxLength: 100 })
  @IsString() @IsNotEmpty() @MaxLength(100)
  user_create!: string;
}
