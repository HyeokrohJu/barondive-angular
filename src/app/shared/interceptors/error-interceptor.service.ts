import { Observable, Observer } from 'rxjs';

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { ApiStatus } from '@app/shared/enum';

/**
 * API Error 처리 Interceptor
 *
 * @export
 * @class ErrorInterceptorService
 * @implements {HttpInterceptor}
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return new Observable((observer: Observer<HttpEvent<any>>) => {
      const sub$ = next.handle(req).subscribe(
        (ev) => {
          if (ev instanceof HttpResponse) {
            if (req.headers.get('apiserver') === 'TRUE') {
              switch (ev.body.statusCd) {
                case ApiStatus.SUCCESS: {
                  break;
                }
                default: {
                  if (ev.body.statusMsg) {
                    alert(ev.body.statusMsg);
                  }
                  throw new Error(
                    `Error Code : ${
                      (ev.body?.statusCd as string) || ''
                    }, Error Msg : ${(ev.body?.statusMsg as string) || ''}`
                  );
                }
              }
            }
          }
          observer.next(ev);
        },
        (err) => {
          if (err.status === 401 || err.status === 400) {
            switch (err.error.error) {
              case 'unauthorized': {
                alert('아이디를 확인하시기 바랍니다.');
                break;
              }
              case 'invalid_grant': {
                alert('비밀번호를 확인하시기 바랍니다.');
                break;
              }
              default:
                break;
            }
          }
          console.error('API Error : ', err);
        },
        () => {
          observer.complete();
        }
      );

      return () => {
        sub$.unsubscribe();
      };
    });
  }
}
