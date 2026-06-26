import { NestFactory }    from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule }      from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import * as http  from 'http';
import * as https from 'https';
import { buildHttpsOptions } from './ssl/ssl-config.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());

  // api/v{n}/<recurso> — versionado independiente del gateway que lo consuma.
  // health queda fuera del prefijo/versión para no romper el healthcheck de Docker.
  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1', prefix: 'v' });

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('ms-bs-practitioner-service')
      .setDescription('Generado por Platform Starter')
      .setVersion('1.0')
      .build();
    SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, config));
  }

  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();

  const port = Number(process.env.PORT ?? 10405);
  http.createServer(expressApp).listen(port, () => {
    console.log(`[ms-bs-practitioner-service] HTTP  -> http://localhost:${port}`);
  });

  const httpsOptions = buildHttpsOptions();
  if (httpsOptions) {
    const sslPort = Number(process.env.SSL_PORT ?? 20405);
    try {
      https.createServer(httpsOptions, expressApp).listen(sslPort, () => {
        console.log(`[ms-bs-practitioner-service] HTTPS -> https://localhost:${sslPort}`);
      });
    } catch (e: any) {
      console.error('Error al iniciar HTTPS:', e.message, '— solo HTTP activo');
    }
  }
}
bootstrap();
