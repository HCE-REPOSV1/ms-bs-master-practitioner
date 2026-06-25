import { Controller, Get, Post, Put, Patch, Param, Body, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PractitionerRoleUseCase } from '../../application/use-cases/PractitionerRole.use-case';
import { PractitionerRoleTypeOrmRepository } from '../persistence/PractitionerRole.typeorm.repository';
import { CreatePractitionerRoleDto } from '../../dto/create-PractitionerRole.dto';
import { UpdatePractitionerRoleDto } from '../../dto/update-PractitionerRole.dto';
import { SetActiveDto } from '../../dto/set-active.dto';

@ApiTags('practitioner-roles')
@Controller('practitioner/roles')
export class PractitionerRoleController {
  private readonly useCase: PractitionerRoleUseCase;

  constructor(private readonly repo: PractitionerRoleTypeOrmRepository) {
    this.useCase = new PractitionerRoleUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos los roles activos' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar rol activo por id' })
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Rol no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear rol de practitioner' })
  create(@Body() dto: CreatePractitionerRoleDto) {
    return this.useCase.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar rol de practitioner' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePractitionerRoleDto) {
    return this.useCase.update(id, { ...dto, date_modify: new Date() });
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Cambiar estado (activar/desactivar) de un rol' })
  @ApiParam({ name: 'id', type: Number })
  setActive(@Param('id', ParseIntPipe) id: number, @Body() dto: SetActiveDto) {
    return this.useCase.setActive(id, dto.is_active === 1, dto.user_modify);
  }
}
