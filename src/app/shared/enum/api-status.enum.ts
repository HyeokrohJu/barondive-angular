/**
 * HTTP 통신 상태 Code
 *
 * @export
 * @enum {number}
 */
export enum ApiStatus {
  SUCCESS = '0200', // 통신 성공
  SERVER_ERR = '0500', // 서버 에러
  DB_ERR = '0600', // DB 에러
  VALID_ERR = '0400', // Validation 에러
  UPLOAD_ERR = '0700', // Upload 에러
}
