// BFF Negocio
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { PractitionerController } from './infrastructure/controllers/Practitioner.controller';
import { PractitionerRoleController } from './infrastructure/controllers/PractitionerRole.controller';
import { PractitionerAddressController } from './infrastructure/controllers/PractitionerAddress.controller';
import { PractitionerContactPointController } from './infrastructure/controllers/PractitionerContactPoint.controller';
import { PractitionerMediaController } from './infrastructure/controllers/PractitionerMedia.controller';
import { PractitionerIdentifierController } from './infrastructure/controllers/PractitionerIdentifier.controller';
import { PractitionerServiceController } from './infrastructure/controllers/PractitionerService.controller';
import { PractitionerSpecialtyMapController } from './infrastructure/controllers/PractitionerSpecialtyMap.controller';
import { Practitioner } from './domain/entities/Practitioner.entity';
import { PractitionerRole } from './domain/entities/PractitionerRole.entity';
import { PractitionerAddress } from './domain/entities/PractitionerAddress.entity';
import { PractitionerContactPoint } from './domain/entities/PractitionerContactPoint.entity';
import { PractitionerMedia } from './domain/entities/PractitionerMedia.entity';
import { PractitionerIdentifier } from './domain/entities/PractitionerIdentifier.entity';
import { PractitionerService } from './domain/entities/PractitionerService.entity';
import { PractitionerSpecialtyMap } from './domain/entities/PractitionerSpecialtyMap.entity';
import { PractitionerTypeOrmRepository } from './infrastructure/persistence/Practitioner.typeorm.repository';
import { PractitionerRoleTypeOrmRepository } from './infrastructure/persistence/PractitionerRole.typeorm.repository';
import { PractitionerAddressTypeOrmRepository } from './infrastructure/persistence/PractitionerAddress.typeorm.repository';
import { PractitionerContactPointTypeOrmRepository } from './infrastructure/persistence/PractitionerContactPoint.typeorm.repository';
import { PractitionerMediaTypeOrmRepository } from './infrastructure/persistence/PractitionerMedia.typeorm.repository';
import { PractitionerIdentifierTypeOrmRepository } from './infrastructure/persistence/PractitionerIdentifier.typeorm.repository';
import { PractitionerServiceTypeOrmRepository } from './infrastructure/persistence/PractitionerService.typeorm.repository';
import { PractitionerSpecialtyMapTypeOrmRepository } from './infrastructure/persistence/PractitionerSpecialtyMap.typeorm.repository';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { KafkaLoggerModule } from './logger/kafka-logger.module';
import { AuditInterceptor } from './logger/audit.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

import { HealthModule } from './health/health.module';
@Module({
  imports: [HealthModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [HealthModule, ConfigModule],
      useFactory: (cfg: ConfigService) => dbConfig(cfg),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Practitioner, PractitionerRole, PractitionerAddress, PractitionerContactPoint, PractitionerMedia, PractitionerIdentifier, PractitionerService, PractitionerSpecialtyMap]),

    KafkaLoggerModule,
  ],
  // ORDEN CRÍTICO: los 7 sub-recursos deben registrarse ANTES que PractitionerController
  // porque este tiene @Get(':uuid') que matchea cualquier string de un segmento bajo /practitioner/.
  controllers: [
    PractitionerRoleController,
    PractitionerAddressController,
    PractitionerContactPointController,
    PractitionerMediaController,
    PractitionerIdentifierController,
    PractitionerServiceController,
    PractitionerSpecialtyMapController,
    PractitionerController,
  ],
  providers: [
    PractitionerTypeOrmRepository,
    PractitionerRoleTypeOrmRepository,
    PractitionerAddressTypeOrmRepository,
    PractitionerContactPointTypeOrmRepository,
    PractitionerMediaTypeOrmRepository,
    PractitionerIdentifierTypeOrmRepository,
    PractitionerServiceTypeOrmRepository,
    PractitionerSpecialtyMapTypeOrmRepository,
    { provide: APP_INTERCEPTOR, useClass: AuditInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class AppModule {}
