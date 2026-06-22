import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PractitionerTypeOrmRepository } from '../persistence/Practitioner.typeorm.repository';

@ApiTags('practitioner')
@Controller('practitioner')
export class PractitionerController {
  constructor(private readonly repo: PractitionerTypeOrmRepository) {}

  @Get('by-username/:adUsername')
  @ApiOperation({ summary: 'Obtener practitioner por AD username (Home login)' })
  @ApiParam({ name: 'adUsername', description: 'AD username del medico autenticado' })
  async findByAdUsername(@Param('adUsername') adUsername: string) {
    const result = await this.repo.findByAdUsername(adUsername);
    if (!result) throw new NotFoundException(`Practitioner no encontrado: ${adUsername}`);
    return result;
  }

  @Get('by-speciality')
  @ApiOperation({ summary: 'Listar medicos por especialidad' })
  @ApiQuery({ name: 'specialityId', required: false, type: Number })
  @ApiQuery({ name: 'localName', required: false, type: String })
  findBySpeciality(
    @Query('specialityId') specialityId?: string,
    @Query('localName') localName?: string,
  ) {
    return this.repo.findBySpeciality(
      specialityId != null ? Number(specialityId) : undefined,
      localName,
    );
  }

  @Get(':uuid/contact-and-address')
  @ApiOperation({ summary: 'Obtener contactos y direcciones de un medico' })
  @ApiParam({ name: 'uuid', description: 'FHIR UUID del practitioner' })
  findContactAndAddress(@Param('uuid') uuid: string) {
    return this.repo.findContactAndAddress(uuid);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Obtener practitioner por UUID FHIR' })
  @ApiParam({ name: 'uuid', description: 'FHIR UUID del practitioner' })
  async findByUuid(@Param('uuid') uuid: string) {
    const result = await this.repo.findByUuid(uuid);
    if (!result) throw new NotFoundException(`Practitioner no encontrado: ${uuid}`);
    return result;
  }
}
