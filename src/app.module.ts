// BFF Negocio
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { FileServerConfigController } from './infrastructure/controllers/FileServerConfig.controller';
import { TenantIdentityController } from './infrastructure/controllers/TenantIdentity.controller';
import { OrganisationController } from './infrastructure/controllers/Organisation.controller';
import { SpecialityController } from './infrastructure/controllers/Speciality.controller';
import { LocationController } from './infrastructure/controllers/Location.controller';
import { PractitionerController } from './infrastructure/controllers/Practitioner.controller';
import { PractitionerRoleController } from './infrastructure/controllers/PractitionerRole.controller';
import { PractitionerAddressController } from './infrastructure/controllers/PractitionerAddress.controller';
import { PractitionerContactPointController } from './infrastructure/controllers/PractitionerContactPoint.controller';
import { PractitionerMediaController } from './infrastructure/controllers/PractitionerMedia.controller';
import { DomainEventOutboxController } from './infrastructure/controllers/DomainEventOutbox.controller';
import { LegacySyncLogController } from './infrastructure/controllers/LegacySyncLog.controller';
import { FileServerConfig } from './domain/entities/FileServerConfig.entity';
import { TenantIdentity } from './domain/entities/TenantIdentity.entity';
import { Organisation } from './domain/entities/Organisation.entity';
import { Speciality } from './domain/entities/Speciality.entity';
import { Location } from './domain/entities/Location.entity';
import { Practitioner } from './domain/entities/Practitioner.entity';
import { PractitionerRole } from './domain/entities/PractitionerRole.entity';
import { PractitionerAddress } from './domain/entities/PractitionerAddress.entity';
import { PractitionerContactPoint } from './domain/entities/PractitionerContactPoint.entity';
import { PractitionerMedia } from './domain/entities/PractitionerMedia.entity';
import { PractitionerIdentifier } from './domain/entities/PractitionerIdentifier.entity';
import { DomainEventOutbox } from './domain/entities/DomainEventOutbox.entity';
import { LegacySyncLog } from './domain/entities/LegacySyncLog.entity';
import { FileServerConfigTypeOrmRepository } from './infrastructure/persistence/FileServerConfig.typeorm.repository';
import { TenantIdentityTypeOrmRepository } from './infrastructure/persistence/TenantIdentity.typeorm.repository';
import { OrganisationTypeOrmRepository } from './infrastructure/persistence/Organisation.typeorm.repository';
import { SpecialityTypeOrmRepository } from './infrastructure/persistence/Speciality.typeorm.repository';
import { LocationTypeOrmRepository } from './infrastructure/persistence/Location.typeorm.repository';
import { PractitionerTypeOrmRepository } from './infrastructure/persistence/Practitioner.typeorm.repository';
import { PractitionerRoleTypeOrmRepository } from './infrastructure/persistence/PractitionerRole.typeorm.repository';
import { PractitionerAddressTypeOrmRepository } from './infrastructure/persistence/PractitionerAddress.typeorm.repository';
import { PractitionerContactPointTypeOrmRepository } from './infrastructure/persistence/PractitionerContactPoint.typeorm.repository';
import { PractitionerMediaTypeOrmRepository } from './infrastructure/persistence/PractitionerMedia.typeorm.repository';
import { DomainEventOutboxTypeOrmRepository } from './infrastructure/persistence/DomainEventOutbox.typeorm.repository';
import { LegacySyncLogTypeOrmRepository } from './infrastructure/persistence/LegacySyncLog.typeorm.repository';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { KafkaLoggerModule } from './logger/kafka-logger.module';
import { AuditInterceptor } from './logger/audit.interceptor';

import { HealthModule } from './health/health.module';
@Module({
  imports: [HealthModule, 
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [HealthModule, ConfigModule],
      useFactory: (cfg: ConfigService) => dbConfig(cfg),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([FileServerConfig, TenantIdentity, Organisation, Speciality, Location, Practitioner, PractitionerRole, PractitionerAddress, PractitionerContactPoint, PractitionerMedia, PractitionerIdentifier, DomainEventOutbox, LegacySyncLog]),

    KafkaLoggerModule,
  ],
  controllers: [FileServerConfigController, TenantIdentityController, OrganisationController, SpecialityController, LocationController, PractitionerController, PractitionerRoleController, PractitionerAddressController, PractitionerContactPointController, PractitionerMediaController, DomainEventOutboxController, LegacySyncLogController],
  providers: [
    FileServerConfigTypeOrmRepository,
    TenantIdentityTypeOrmRepository,
    OrganisationTypeOrmRepository,
    SpecialityTypeOrmRepository,
    LocationTypeOrmRepository,
    PractitionerTypeOrmRepository,
    PractitionerRoleTypeOrmRepository,
    PractitionerAddressTypeOrmRepository,
    PractitionerContactPointTypeOrmRepository,
    PractitionerMediaTypeOrmRepository,
    DomainEventOutboxTypeOrmRepository,
    LegacySyncLogTypeOrmRepository,
    { provide: APP_INTERCEPTOR, useClass: AuditInterceptor },
  ],
})
export class AppModule {}
