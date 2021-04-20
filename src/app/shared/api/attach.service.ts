import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { CKEditor4 } from 'ckeditor4-angular';

import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonUtils } from '@app/shared/utils';

import {
  ApiAttachRoot,
  AppConfig,
  AttachDelParam,
  AttachDesc,
  AttachParam,
  EditorUploadParam,
  HttpRes,
} from '@app/shared/interfaces';
import { APP_CONFIG } from '@app/shared/providers';
import { HttpService } from '@app/shared/services';
import { YN } from '../interfaces/base';

/**
 * Attach Service
 *
 * @export
 * @class AttachService
 * @extends {HttpService}
 */
@Injectable({
  providedIn: 'root',
})
export class AttachService extends HttpService {
  constructor(
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
    protected httpClient: HttpClient
  ) {
    super(appConfig, httpClient);
  }

  /**
   * 첨부파일 리스트 조회
   *
   * @param {AttachParam} param
   * @return {*}  {Observable<AttachDesc[]>}
   * @memberof AttachService
   */
  public getAttachList(param: AttachParam): Observable<AttachDesc[]> {
    return this.reqGet('/attach/selectAttachPg', param).pipe(
      map((res: HttpRes): AttachDesc[] => {
        const bltList: ApiAttachRoot = res.resMap as ApiAttachRoot;
        const retList = _.map(bltList.selectAttachPg, (attach) => {
          return {
            ...attach,
            filesize: CommonUtils.convertBytes(Number(attach.filesize)),
          };
        });

        return retList || ([] as AttachDesc[]);
      })
    );
  }

  /**
   * CKEditor 이미지 업로드 Request 처리
   *
   * @param {CKEditor4.EventInfo} evt
   * @param {EditorUploadParam} param
   * @memberof AttachService
   */
  public editorFileUploadReq(
    evt: CKEditor4.EventInfo,
    param: EditorUploadParam
  ): void {
    const { fileLoader } = evt.data;
    const formData = new FormData();
    const { xhr } = fileLoader;

    formData.append('file', fileLoader.file, fileLoader.fileName);
    _.forEach(param, (value: string | YN, key: string) => {
      formData.append(key, value);
    });
    xhr.open('POST', fileLoader.uploadUrl, true);
    xhr.send(formData);
    evt.stop();
  }

  /**
   * CKEditor 이미지 업로드 Response 처리
   *
   * @param {CKEditor4.EventInfo} evt
   * @return {*}  {(AttachDesc | null)}
   * @memberof AttachService
   */
  public editorFileUploadRes(evt: CKEditor4.EventInfo): AttachDesc | null {
    evt.stop();
    const { data } = evt;
    const jsonStr = evt.data.fileLoader.xhr.responseText;
    const resJson = JSON.parse(jsonStr);
    const { resMap } = resJson;
    if (resMap) {
      data.uploaded = 1;
      data.fileName = resMap.filenm;
      data.url = resMap.fileurl;

      return resMap as AttachDesc;
    }

    return null;
  }

  /**
   * 첨부파일 삭제
   *
   * @param {AttachDelParam} param
   * @return {*}  {Observable<HttpRes>}
   * @memberof AttachService
   */
  public delAttach(param: AttachDelParam): Observable<HttpRes> {
    return this.reqDelete('/attach/deleteAttach', param);
  }
}
