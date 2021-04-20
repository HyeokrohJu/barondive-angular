import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { ActivationStart, Router } from '@angular/router';

import { HttpCancelService } from '@app/shared/services';

/**
 * API Cancel Interceptor
 *
 * @export
 * @class CancelInterceptorService
 * @implements {HttpInterceptor}
 */
@Injectable({
  providedIn: 'root',
})
export class CancelInterceptorService implements HttpInterceptor {
  constructor(router: Router, private httpCancelService: HttpCancelService) {
    router.events.subscribe((event: any) => {
      if (event instanceof ActivationStart) {
        this.httpCancelService.cancelPendingReq();
      }
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.indexOf('config.json') > -1) {
      return next.handle(req);
    }
    return next
      .handle(req)
      .pipe(takeUntil(this.httpCancelService.onCancelPendingReq()));
  }
}
