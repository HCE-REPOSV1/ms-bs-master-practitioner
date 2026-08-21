// db.config.ts — Configuración de base de datos
// Las credenciales se leen desde variables de entorno en tiempo de ejecución
//
// ─── Fuentes de variables según ambiente ──────────────────
// Local dev  : archivo .env (solo desarrollo)
// Docker     : variables en docker run / docker-compose
// Kubernetes : Secrets de K8s montados como env vars
// Azure      : Azure Key Vault + App Configuration
// AWS        : Secrets Manager + Parameter Store
// HashiCorp  : Vault Agent Sidecar
// ──────────────────────────────────────────────────────────
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function dbConfig(cfg: ConfigService): TypeOrmModuleOptions {
  return {
    type: 'mssql',
    host:     cfg.get<string>('DB_HOST', 'localhost'),
    port:     Number(cfg.get('DB_PORT', 1433)),
    username: cfg.get<string>('DB_USER'),
    password: cfg.get<string>('DB_PASS'),
    database: cfg.get<string>('DB_NAME'),
    options: {
      encrypt:                false,
      trustServerCertificate: true,
      connectTimeout:         30000,
      instanceName: cfg.get<string>('DB_INSTANCE', ''),
    },
    pool: { max: cfg.get('NODE_ENV') === 'production' ? 25 : 5, min: 0 },
    autoLoadEntities: true,
    synchronize: false,
    logging: cfg.get('NODE_ENV') === 'development',
  };
}
