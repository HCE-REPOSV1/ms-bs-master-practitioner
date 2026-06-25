import { Controller, Get, Post, Put, Patch, Param, Body, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PractitionerContactPointUseCase } from '../../application/use-cases/PractitionerContactPoint.use-case';
import { PractitionerContactPointTypeOrmRepository } from '../persistence/PractitionerContactPoint.typeorm.repository';
import { CreatePractitionerContactPointDto } from '../../dto/create-PractitionerContactPoint.dto';
import { UpdatePractitionerContactPointDto } from '../../dto/update-PractitionerContactPoint.dto';
import { SetActiveDto } from '../../dto/set-active.dto';

@ApiTags('practitioner-contact-points')
@Controller('practitioner/contact-points')
export class PractitionerContactPointController {
  private readonly useCase: PractitionerContactPointUseCase;

  constructor(private readonly repo: PractitionerContactPointTypeOrmRepository) {
    this.useCase = new PractitionerContactPointUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos los contactos activos' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar contacto activo por id' })
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Contacto no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear contacto de practitioner' })
  create(@Body() dto: CreatePractitionerContactPointDto) {
    return this.useCase.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar contacto de practitioner' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePractitionerContactPointDto) {
    return this.useCase.update(id, { ...dto, date_modify: new Date() });
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Cambiar estado (activar/desactivar) de un contacto' })
  @ApiParam({ name: 'id', type: Number })
  setActive(@Param('id', ParseIntPipe) id: number, @Body() dto: SetActiveDto) {
    return this.useCase.setActive(id, dto.is_active === 1, dto.user_modify);
  }
}
