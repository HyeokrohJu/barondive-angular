import { Observable, Subject } from 'rxjs';

import { Injectable } from '@angular/core';

/**
 * HTTP Call Cancel Service
 *
 * @export
 * @class HttpCancelService
 */
@Injectable({
  providedIn: 'root',
})
export class HttpCancelService {
  private cancelPendingReq$ = new Subject<void>();

  public cancelPendingReq(): void {
    this.cancelPendingReq$.next();
  }

  public onCancelPendingReq(): Observable<void> {
    return this.cancelPendingReq$.asObservable();
  }
}
