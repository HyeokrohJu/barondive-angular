import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { OauthUtils } from '../utils';

/**
 * 페이지 권한 체크
 *
 * @export
 * @class AuthGuardService
 * @implements {CanActivate}
 * @implements {CanActivateChild}
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  /**
   * 해당 라우트 권한 체크
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @return {*}  {(Observable<boolean | UrlTree>
   *     | Promise<boolean | UrlTree>
   *     | boolean
   *     | UrlTree)}
   * @memberof AuthGuardService
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.check(state);
  }

  /**
   * 해당 라우트 자식 권한 체크
   *
   * @param {ActivatedRouteSnapshot} childRoute
   * @param {RouterStateSnapshot} state
   * @return {*}  {(boolean
   *     | UrlTree
   *     | Observable<boolean | UrlTree>
   *     | Promise<boolean | UrlTree>)}
   * @memberof AuthGuardService
   */
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.check(state);
  }

  /**
   * 권한 체크하여 권한이 없을경우 로그인 페이지로 이동
   *
   * @param {RouterStateSnapshot} state
   * @return {*}  {boolean}
   * @memberof AuthGuardService
   */
  check(state: RouterStateSnapshot): boolean {
    if (OauthUtils.isToken()) {
      return true;
    }
    this.router.navigate(['/any/login'], {
      queryParams: { retUrl: state.url },
    });
    return false;
  }
}
