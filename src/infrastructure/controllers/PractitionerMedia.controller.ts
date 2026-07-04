import { Controller, Get, Post, Put, Patch, Param, Body, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PractitionerMediaUseCase } from '../../application/use-cases/PractitionerMedia.use-case';
import { PractitionerMediaTypeOrmRepository } from '../persistence/PractitionerMedia.typeorm.repository';
import { CreatePractitionerMediaDto } from '../../dto/create-PractitionerMedia.dto';
import { UpdatePractitionerMediaDto } from '../../dto/update-PractitionerMedia.dto';
import { SetActiveDto } from '../../dto/set-active.dto';

// Nota: el archivo binario en si (upload/descarga/streaming) lo sirve ms-tch-media.
// Este controller administra solo la metadata de practitioner.practitioner_media.
@ApiTags('practitioner-media')
@Controller('practitioner/media')
export class PractitionerMediaController {
  private readonly useCase: PractitionerMediaUseCase;

  constructor(private readonly repo: PractitionerMediaTypeOrmRepository) {
    this.useCase = new PractitionerMediaUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar toda la metadata de media activa' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar metadata de media activa por id' })
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Media no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Registrar metadata de un archivo de practitioner' })
  create(@Body() dto: CreatePractitionerMediaDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar metadata de un archivo de practitioner' })
  @ApiParam({ name: 'id', type: Number })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePractitionerMediaDto) {
    const result = await this.useCase.update(id, { ...dto, date_modify: new Date() } as any);
    if (!result) throw new NotFoundException(`Media no encontrado: ${id}`);
    return result;
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Cambiar estado (activar/desactivar) de un archivo' })
  @ApiParam({ name: 'id', type: Number })
  async setActive(@Param('id', ParseIntPipe) id: number, @Body() dto: SetActiveDto) {
    const result = await this.useCase.setActive(id, dto.is_active === 1, dto.user_modify);
    if (!result) throw new NotFoundException(`Media no encontrado: ${id}`);
    return result;
  }
}
