import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { CreatePractitionerRoleDto } from './create-PractitionerRole.dto';

export class UpdatePractitionerRoleDto extends PartialType(
  OmitType(CreatePractitionerRoleDto, ['user_create'] as const),
) {
  @ApiProperty({ maxLength: 100, description: 'Usuario que modifica el registro' })
  @IsString() @IsNotEmpty() @MaxLength(100)
  user_modify!: string;
}
