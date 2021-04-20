import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';

import { MemberService } from '@app/shared/api';

/**
 * Validator Utils
 *
 * @export
 * @class ValidatorUtils
 */
export class ValidatorUtils {
  /**
   * 휴대전화 형식 Validator
   *
   * @static
   * @param {AbstractControl} control
   * @return {*}  {(ValidationErrors | null)}
   * @memberof ValidatorUtils
   */
  static mphone(control: AbstractControl): ValidationErrors | null {
    const { value } = control;
    return !value ||
      value.match(/^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/i)
      ? null
      : { mphone: true };
  }

  /**
   * 비밀번호 규칙 정규식
   * 숫자, 특수문자 1개이상, 영문 2개 이상 사용하여 8자리 이상 입력
   *
   * @static
   * @param {AbstractControl} control
   * @return {*}  {(ValidationErrors | null)}
   * @memberof ValidatorUtils
   */
  static password(control: AbstractControl): ValidationErrors | null {
    const { value } = control;
    return !value ||
      value.match(
        /(?=.*\d{1,50})(?=.*[~`!@#$%\\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/i
      )
      ? null
      : { password: true };
  }

  /**
   * 아이디 중복 체크
   *
   * @static
   * @param {MemberService} memServ
   * @return {*}  {AsyncValidatorFn}
   * @memberof ValidatorUtils
   */
  static isMemberDiff(memServ: MemberService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return memServ.isDiffMember({ loginid: control.value }).pipe(
        map((result: boolean) => {
          return result ? null : { isMemberDiff: true };
        })
      );
    };
  }
}
