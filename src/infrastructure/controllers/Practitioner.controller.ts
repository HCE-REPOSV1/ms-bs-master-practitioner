import { Controller, Get, Post, Put, Patch, Param, Query, Body, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PractitionerTypeOrmRepository } from '../persistence/Practitioner.typeorm.repository';
import { PractitionerUseCase } from '../../application/use-cases/Practitioner.use-case';
import { CreatePractitionerDto } from '../../dto/create-Practitioner.dto';
import { UpdatePractitionerDto } from '../../dto/update-Practitioner.dto';
import { SetActiveDto } from '../../dto/set-active.dto';

@ApiTags('practitioner')
@Controller('practitioner')
export class PractitionerController {
  private readonly useCase: PractitionerUseCase;

  constructor(private readonly repo: PractitionerTypeOrmRepository) {
    this.useCase = new PractitionerUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos los practitioners activos' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get('by-id/:id')
  @ApiOperation({ summary: 'Buscar practitioner activo por id numerico interno' })
  @ApiParam({ name: 'id', type: Number })
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Practitioner no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear practitioner' })
  create(@Body() dto: CreatePractitionerDto) {
    return this.useCase.create(dto as any);
  }

  @Put('by-id/:id')
  @ApiOperation({ summary: 'Actualizar practitioner' })
  @ApiParam({ name: 'id', type: Number })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePractitionerDto) {
    const result = await this.useCase.update(id, { ...dto, date_modify: new Date() } as any);
    if (!result) throw new NotFoundException(`Practitioner no encontrado: ${id}`);
    return result;
  }

  @Patch('by-id/:id/estado')
  @ApiOperation({ summary: 'Cambiar estado (activar/desactivar) de un practitioner' })
  @ApiParam({ name: 'id', type: Number })
  async setActive(@Param('id', ParseIntPipe) id: number, @Body() dto: SetActiveDto) {
    const result = await this.useCase.setActive(id, dto.is_active === 1, dto.user_modify);
    if (!result) throw new NotFoundException(`Practitioner no encontrado: ${id}`);
    return result;
  }

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
