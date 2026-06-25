import { Controller, Get, Post, Put, Patch, Param, Body, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PractitionerServiceUseCase } from '../../application/use-cases/PractitionerService.use-case';
import { PractitionerServiceTypeOrmRepository } from '../persistence/PractitionerService.typeorm.repository';
import { CreatePractitionerServiceDto } from '../../dto/create-PractitionerService.dto';
import { UpdatePractitionerServiceDto } from '../../dto/update-PractitionerService.dto';
import { SetActiveDto } from '../../dto/set-active.dto';

@ApiTags('practitioner-services')
@Controller('practitioner/services')
export class PractitionerServiceController {
  private readonly useCase: PractitionerServiceUseCase;

  constructor(private readonly repo: PractitionerServiceTypeOrmRepository) {
    this.useCase = new PractitionerServiceUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos los servicios/departamentos activos del practitioner' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar servicio activo por id' })
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Servicio no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Asignar servicio/departamento a un practitioner' })
  create(@Body() dto: CreatePractitionerServiceDto) {
    return this.useCase.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar servicio/departamento del practitioner' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePractitionerServiceDto) {
    return this.useCase.update(id, { ...dto, date_modify: new Date() });
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Cambiar estado (activar/desactivar) de un servicio' })
  @ApiParam({ name: 'id', type: Number })
  setActive(@Param('id', ParseIntPipe) id: number, @Body() dto: SetActiveDto) {
    return this.useCase.setActive(id, dto.is_active === 1, dto.user_modify);
  }
}
