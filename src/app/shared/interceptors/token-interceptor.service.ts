import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { OauthUtils } from '@app/shared/utils';

/**
 * HTTP CALL JWT(Auth Token)등록 Interceptor
 *
 * @export
 * @class TokenInterceptorService
 * @implements {HttpInterceptor}
 */
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let nwReq: HttpRequest<any>;

    if (
      OauthUtils.isToken() &&
      req.headers.get('apiserver') === 'TRUE' &&
      req.headers.get('isToken') === 'TRUE'
    ) {
      const reqHeader = {
        withCredentials: true,
        headers: req.headers.append(
          'Authorization',
          `Bearer ${OauthUtils.storageToken().access_token}`
        ),
      };
      nwReq = req.clone(reqHeader);
    } else {
      nwReq = req.clone({ withCredentials: true });
    }

    return next.handle(nwReq);
  }
}
