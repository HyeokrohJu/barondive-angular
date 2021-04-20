import { YN } from './base';

/**
 * 첨부파일 조회 Parameter
 *
 * @export
 * @interface AttachParam
 */
export interface AttachParam {
  tblnm: string;
  tblkey: number;
  editoryn: YN;
}

/**
 * 첨부파일 API Root
 *
 * @export
 * @interface ApiAttachRoot
 */
export interface ApiAttachRoot {
  selectAttachPg: AttachDesc[];
}

/**
 * 첨부파일 상세
 *
 * @export
 * @interface AttachDesc
 */
export interface AttachDesc {
  attachid: number;
  credate: number;
  creid: string;
  creip: string;
  custom1: string;
  custom2: string;
  custom3: string;
  disporder: number;
  editoryn: YN;
  filenm: string;
  filepath: string;
  filesize: string;
  filesnm: string;
  filethumb: string;
  filetype: string;
  fileurl: string;
  tblkey: string;
  tblnm: string;
  tempkey: string;
  upddate: number;
  updid: string;
  updip: string;
}

/**
 * 에디터 이미지 업로드 Parameter
 *
 * @export
 * @interface EditorUploadParam
 */
export interface EditorUploadParam {
  tblnm: string;
  editoryn: YN;
  tempkey: string;
}

/**
 * 첨부파일 삭제 Parameter
 *
 * @export
 * @interface AttachDelParam
 */
export interface AttachDelParam {
  attachid?: number;
  tblnm?: string;
  tblkey?: string;
  filenm?: string;
  tempkey?: string;
  editoryn?: YN;
}

/**
 * PlUpload 설정
 *
 * @export
 * @interface PluploadConfig
 */
export interface PluploadConfig {
  id: string;
  container?: string;
  buttonSelect?: string;
  buttonUpload?: string;
  autoUpload?: boolean;
  multipart?: boolean;
  chunk_size?: string;
  runtimes?: string;
  flash_swf_url?: string;
  silverlight_xap_url?: string;
  url?: string;
  multipart_params?: any;
  multi_selection?: boolean;

  PostInit?: (up: any) => void;
  Browse?: (up: any) => void;
  Refresh?: (up: any) => void;
  QueueChanged?: (up: any) => void;
  OptionChanged?: (up: any, name: string, value: any, oldValue: any) => void;
  BeforeUpload?: (up: any, file: any) => void;
  FileFiltered?: (up: any, file: any) => void;
  ChunkUploaded?: (
    up: any,
    file: any,
    result: {
      offset: number;
      total: number;
      response: string;
      status: number;
      responseHeaders: string;
    }
  ) => void;
  Destroy?: (up: any) => void;
  Error?: (up: any, error: { code: number; message: string }) => void;
  RemoveFile?: () => void;
}

/**
 * 업로드 완료 Return
 *
 * @export
 * @interface UploadedItem
 */
export interface UploadedItem {
  uploader: any;
  files: any;
}
