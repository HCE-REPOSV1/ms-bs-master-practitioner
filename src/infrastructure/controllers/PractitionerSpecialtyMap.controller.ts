import { Controller, Get, Post, Put, Patch, Param, Body, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PractitionerSpecialtyMapUseCase } from '../../application/use-cases/PractitionerSpecialtyMap.use-case';
import { PractitionerSpecialtyMapTypeOrmRepository } from '../persistence/PractitionerSpecialtyMap.typeorm.repository';
import { CreatePractitionerSpecialtyMapDto } from '../../dto/create-PractitionerSpecialtyMap.dto';
import { UpdatePractitionerSpecialtyMapDto } from '../../dto/update-PractitionerSpecialtyMap.dto';
import { SetActiveDto } from '../../dto/set-active.dto';

@ApiTags('practitioner-specialty-map')
@Controller('practitioner/specialty-map')
export class PractitionerSpecialtyMapController {
  private readonly useCase: PractitionerSpecialtyMapUseCase;

  constructor(private readonly repo: PractitionerSpecialtyMapTypeOrmRepository) {
    this.useCase = new PractitionerSpecialtyMapUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todas las especialidades activas asignadas a practitioners' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar asignacion de especialidad activa por id' })
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Asignacion de especialidad no encontrada: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Asignar especialidad (credencial) a un practitioner' })
  create(@Body() dto: CreatePractitionerSpecialtyMapDto) {
    return this.useCase.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar asignacion de especialidad del practitioner' })
  @ApiParam({ name: 'id', type: Number })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePractitionerSpecialtyMapDto) {
    const result = await this.useCase.update(id, { ...dto, date_modify: new Date() });
    if (!result) throw new NotFoundException(`Asignacion de especialidad no encontrada: ${id}`);
    return result;
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Cambiar estado (activar/desactivar) de una asignacion de especialidad' })
  @ApiParam({ name: 'id', type: Number })
  async setActive(@Param('id', ParseIntPipe) id: number, @Body() dto: SetActiveDto) {
    const result = await this.useCase.setActive(id, dto.is_active === 1, dto.user_modify);
    if (!result) throw new NotFoundException(`Asignacion de especialidad no encontrada: ${id}`);
    return result;
  }
}
