import { Controller, Get, Post, Put, Patch, Param, Body, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PractitionerIdentifierUseCase } from '../../application/use-cases/PractitionerIdentifier.use-case';
import { PractitionerIdentifierTypeOrmRepository } from '../persistence/PractitionerIdentifier.typeorm.repository';
import { CreatePractitionerIdentifierDto } from '../../dto/create-PractitionerIdentifier.dto';
import { UpdatePractitionerIdentifierDto } from '../../dto/update-PractitionerIdentifier.dto';
import { SetActiveDto } from '../../dto/set-active.dto';

@ApiTags('practitioner-identifiers')
@Controller('practitioner/identifiers')
export class PractitionerIdentifierController {
  private readonly useCase: PractitionerIdentifierUseCase;

  constructor(private readonly repo: PractitionerIdentifierTypeOrmRepository) {
    this.useCase = new PractitionerIdentifierUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos los identificadores activos' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar identificador activo por id' })
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Identificador no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear identificador de practitioner (CMP/DNI/pasaporte)' })
  create(@Body() dto: CreatePractitionerIdentifierDto) {
    return this.useCase.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar identificador de practitioner' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePractitionerIdentifierDto) {
    return this.useCase.update(id, { ...dto, date_modify: new Date() });
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Cambiar estado (activar/desactivar) de un identificador' })
  @ApiParam({ name: 'id', type: Number })
  setActive(@Param('id', ParseIntPipe) id: number, @Body() dto: SetActiveDto) {
    return this.useCase.setActive(id, dto.is_active === 1, dto.user_modify);
  }
}
