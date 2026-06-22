import {
  Injectable, NestInterceptor, ExecutionContext, CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { KafkaLoggerService } from './kafka-logger.service';

/**
 * Interceptor de audit para microservicios CN/BS.
 * Lee el contexto de audit inyectado por el AG (X-Trace-ID, X-User-ID, X-Username)
 * y registra cada request/response en Kafka automáticamente.
 *
 * Registrado globalmente en app.module.ts vía APP_INTERCEPTOR.
 * El desarrollador puede además inyectar KafkaLoggerService en sus
 * servicios/use-cases para registrar eventos de negocio específicos.
 */
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly logger: KafkaLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req   = context.switchToHttp().getRequest();
    if (req.url === '/health') return next.handle();
    const start = Date.now();

    // Extraer contexto de audit propagado por el AG
    const auditCtx = this.logger.extractAuditContext(req.headers);

    return next.handle().pipe(
      tap({
        next: () => {
          const res      = context.switchToHttp().getResponse();
          const duration = Date.now() - start;
          this.logger.log({
            ...auditCtx,
            eventType: 'SERVICE_CALL',
            level:     res.statusCode < 400 ? 'INFO' : 'WARN',
            action:    `${req.method} ${req.url}`,
            outcome:   res.statusCode < 400 ? 'SUCCESS' : 'FAILED',
            message:   `${req.method} ${req.url} — ${res.statusCode} (${duration}ms)`,
            payload:   { method: req.method, url: req.url, statusCode: res.statusCode, duration },
          });
        },
        error: (err) => {
          const duration = Date.now() - start;
          this.logger.log({
            ...auditCtx,
            eventType: 'SERVICE_CALL',
            level:     'ERROR',
            action:    `${req.method} ${req.url}`,
            outcome:   'ERROR',
            message:   `${req.method} ${req.url} — ERROR (${duration}ms): ${err?.message}`,
            payload:   { method: req.method, url: req.url, duration, error: err?.message },
          });
        },
      }),
    );
  }
}
