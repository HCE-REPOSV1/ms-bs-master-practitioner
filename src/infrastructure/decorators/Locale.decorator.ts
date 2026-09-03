import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SUPPORTED_LOCALES = ['es', 'en'] as const;
export const DEFAULT_LOCALE = 'es';

/**
 * Resuelve el locale desde el header estandar Accept-Language (ej. "en-US,en;q=0.9" -> "en").
 * Default 'es' si no viene el header o el idioma pedido no esta soportado. Decorator/pipe liviano
 * duplicado a proposito en cada microservicio consumidor: no hay paquete npm compartido entre
 * ellos (cada uno con su propio Dockerfile), asi que esta duplicacion es intencional. Copia
 * identica a la de ms-bs-catalogs / ms-bs-core-encounter / ms-bs-master-patient.
 */
export const Locale = createParamDecorator((_data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest();
  const header: string | undefined = request?.headers?.['accept-language'];
  if (!header) return DEFAULT_LOCALE;

  const primary = header.split(',')[0]?.split(';')[0]?.trim().split('-')[0]?.toLowerCase();
  return primary && (SUPPORTED_LOCALES as readonly string[]).includes(primary) ? primary : DEFAULT_LOCALE;
});
