/**
 * APP 설정
 *
 * @export
 * @interface AppConfig
 */
export interface AppConfig {
  apiConfig: ApiConfig;
  oAuth2Config: OAuth2Config;
  brdConfig: BrdConfig;
  editorConfig: EditorConfig;
}

/**
 * APP API 설정
 *
 * @export
 * @interface ApiConfig
 */
export interface ApiConfig {
  apiHost: string;
  apiPath: string;
  apiPort: number;
  apiSsl: boolean;
  apiSslPort: number;
}

/**
 * oAuth2 설정
 *
 * @export
 * @interface OAuth2Config
 */
export interface OAuth2Config {
  protocol: string;
  domain: string;
  port: number;
  clientId: string;
  client_secret: string;
  scope: string;
  grantType: string;
  path: string;
  refreshGrantType: string;
  hrSchema: string;
  hrIfSchema: string;
  hrTimeZone: string;
}

/**
 * 게시판 관련 설정
 *
 * @export
 * @interface BrdConfig
 */
export interface BrdConfig {
  listItemsPerPage: number;
  imgItemsPerPage: number;
  cmntItemsPerPage: number;
}

/**
 * CKEditor 설정
 *
 * @export
 * @interface EditorConfig
 */
export interface EditorConfig {
  height: number;
  removeButtons: string;
  uploadUrl: string;
  filebrowserImageUploadUrl: string;
  fileBrowserUploadMethod: string;
}
