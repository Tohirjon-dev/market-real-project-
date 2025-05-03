import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable, timestamp } from 'rxjs';

export class ResInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        return {
          succes: true,
          data,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
