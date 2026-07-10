import { IsIn, IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// Cambio de estado generico — reemplaza el delete fisico en todos los recursos de este MS.
// Todas las tablas del modelo V2 tienen is_active; "borrar" siempre es is_active = 0.
export class SetActiveDto {
  @ApiProperty({ enum: [0, 1], description: '1 = activo, 0 = inactivo' })
  @Type(() => Number)
  @IsIn([0, 1])
  is_active!: number;

  @ApiProperty({ maxLength: 100, description: 'Usuario que realiza el cambio de estado' })
  @IsString() @IsNotEmpty() @MaxLength(100)
  user_modify!: string;
}
