import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagedResult } from '../response/paged-result';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const statusCode: number = ctx.switchToHttp().getResponse().statusCode;
    return next.handle().pipe(
      map(data => {
        if (data instanceof PagedResult) {
          return { success: true, statusCode, message: 'OK', data: data.items, meta: data.meta };
        }
        return { success: true, statusCode, message: 'OK', data };
      }),
    );
  }
}
