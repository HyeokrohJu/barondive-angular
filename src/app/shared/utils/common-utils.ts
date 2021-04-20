import * as _ from 'lodash';
import * as moment from 'moment';

/**
 * Common Utils
 *
 * @export
 * @class CommonUtils
 */
export class CommonUtils {
  /**
   * Object -> QueryString으로 변경
   *
   * @static
   * @param {*} params
   * @return {*}  {string}
   * @memberof CommonUtils
   */
  public static objToQStr(params: any): string {
    const nwParams: URLSearchParams = new URLSearchParams();
    _.forEach(params, (val, key) => {
      nwParams.set(key, val);
    });
    return nwParams.toString();
  }

  /**
   * QueryString -> Object 변경
   *
   * @static
   * @param {string} qStr
   * @return {*}  {any}
   * @memberof CommonUtils
   */
  public static strToObj(qStr: string): any {
    return JSON.parse(
      `{"${decodeURI(qStr)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`
    );
  }

  /**
   * Byte 단위 변환
   *
   * @static
   * @param {number} bytes
   * @param {number} [decimals=2]
   * @return {*}  {string}
   * @memberof CommonUtils
   */
  public static convertBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) {
      return '0 bytes';
    }

    const k = 1024;
    const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${(Math.floor(bytes / k ** i) * 10 ** decimals) / 10 ** decimals}${
      sizes[i]
    }`;
  }

  /**
   * UUID 생성
   *
   * @static
   * @return {*}  {string}
   * @memberof CommonUtils
   */
  public static getUUID(): string {
    const date = moment().format('YYYYMMDDHHmmss');
    const s4 = ((1 + Math.random()) * 0x10000 || 0).toString(16).substring(1);
    return `${date}-${s4}`;
  }
}
