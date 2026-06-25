import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { CreatePractitionerIdentifierDto } from './create-PractitionerIdentifier.dto';

export class UpdatePractitionerIdentifierDto extends PartialType(
  OmitType(CreatePractitionerIdentifierDto, ['user_create'] as const),
) {
  @ApiProperty({ maxLength: 100, description: 'Usuario que modifica el registro' })
  @IsString() @IsNotEmpty() @MaxLength(100)
  user_modify!: string;
}
