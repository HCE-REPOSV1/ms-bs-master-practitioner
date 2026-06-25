import { Controller, Get, Post, Put, Patch, Param, Body, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PractitionerAddressUseCase } from '../../application/use-cases/PractitionerAddress.use-case';
import { PractitionerAddressTypeOrmRepository } from '../persistence/PractitionerAddress.typeorm.repository';
import { CreatePractitionerAddressDto } from '../../dto/create-PractitionerAddress.dto';
import { UpdatePractitionerAddressDto } from '../../dto/update-PractitionerAddress.dto';
import { SetActiveDto } from '../../dto/set-active.dto';

@ApiTags('practitioner-addresses')
@Controller('practitioner/addresses')
export class PractitionerAddressController {
  private readonly useCase: PractitionerAddressUseCase;

  constructor(private readonly repo: PractitionerAddressTypeOrmRepository) {
    this.useCase = new PractitionerAddressUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todas las direcciones activas' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar direccion activa por id' })
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Direccion no encontrada: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear direccion de practitioner' })
  create(@Body() dto: CreatePractitionerAddressDto) {
    return this.useCase.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar direccion de practitioner' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePractitionerAddressDto) {
    return this.useCase.update(id, { ...dto, date_modify: new Date() });
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Cambiar estado (activar/desactivar) de una direccion' })
  @ApiParam({ name: 'id', type: Number })
  setActive(@Param('id', ParseIntPipe) id: number, @Body() dto: SetActiveDto) {
    return this.useCase.setActive(id, dto.is_active === 1, dto.user_modify);
  }
}
