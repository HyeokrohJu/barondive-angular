import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  AppConfig,
  ApiNavRoot,
  HttpRes,
  NavList,
  NavListParam,
} from '@app/shared/interfaces';
import { APP_CONFIG } from '@app/shared/providers';
import { HttpService } from '@app/shared/services';

/**
 * NAV API Service
 *
 * @export
 * @class NavService
 * @extends {HttpService}
 */
@Injectable({
  providedIn: 'root',
})
export class NavService extends HttpService {
  constructor(
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
    protected httpClient: HttpClient
  ) {
    super(appConfig, httpClient);
  }

  /**
   * NAV 조회
   *
   * @param {NavListParam} param
   * @return {*}  {Observable<NavList[]>}
   * @memberof NavService
   */
  public getNav(param: NavListParam): Observable<NavList[]> {
    return this.reqGet('/menu/selectMenuTree', param).pipe(
      map((res: HttpRes): NavList[] => {
        const treeRoot: NavList = (res.resMap as ApiNavRoot)?.selectMenuTree[0];
        return treeRoot ? treeRoot.children : ([] as NavList[]);
      })
    );
  }
}
