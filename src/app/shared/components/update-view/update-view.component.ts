import { fromEvent, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CKEditor4 } from 'ckeditor4-angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { APP_CONFIG } from '@app/shared/providers';
import {
  ApiConfig,
  AppConfig,
  AttachDelParam,
  AttachDesc,
  BltDesc,
  BltInsParam,
  EditorUploadParam,
  PluploadConfig,
  UploadedItem,
} from '@app/shared/interfaces';
import { AttachService, BltService } from '@app/shared/api';
import { CommonUtils } from '@app/shared/utils';
import { PluploadComponent } from '../plupload/plupload.component';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-update-view',
  templateUrl: './update-view.component.html',
  styleUrls: ['./update-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateViewComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input()
  public brdid!: string;

  @Input()
  public bltid!: number;

  private _bltDesc!: BltDesc;

  @Input()
  public get bltDesc(): BltDesc {
    return this._bltDesc;
  }

  public set bltDesc(blt: BltDesc) {
    this._bltDesc = blt;

    this.bltInsParam = {
      ...blt,
    };
  }

  @Input()
  public attachList: AttachDesc[] = [] as AttachDesc[];

  @Input()
  public editorAttachList: AttachDesc[] = [] as AttachDesc[];

  @Input()
  public isRepImg: boolean | undefined;

  @Output()
  public cancelEv: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public updProcEv: EventEmitter<void> = new EventEmitter<void>();

  private apiConfig: ApiConfig = {} as ApiConfig;

  public config: CKEditor4.Config;

  private uuid!: string;

  private editorInstance!: CKEditor4.Editor;

  private get apiUrl(): string {
    const protocol = this.apiConfig.apiSsl ? 'https://' : 'http://';
    if (this.apiConfig.apiSsl) {
      const sslPort: string =
        this.apiConfig.apiSslPort === 443
          ? ''
          : `:${this.apiConfig.apiSslPort}`;
      return `${protocol}${this.apiConfig.apiHost}${sslPort}${this.apiConfig.apiPath}`;
    }
    const port: string =
      this.apiConfig.apiPort === 80 ? '' : `:${this.apiConfig.apiPort}`;
    return `${protocol}${this.apiConfig.apiHost}${port}${this.apiConfig.apiPath}`;
  }

  private activeImg$: Subject<void> = new Subject<void>();

  private editorAddImg$: Subject<void> = new Subject<void>();

  private editorDelImg$: Subject<void> = new Subject<void>();

  private bltIns$: Subject<void> = new Subject<void>();

  public bltInsParam!: BltInsParam;

  public plConfig!: PluploadConfig;

  public editorPlConfig!: PluploadConfig;

  @ViewChild(PluploadComponent)
  private plupload!: PluploadComponent;

  @ViewChildren('activeImgEl')
  private set activeImgEls(els: QueryList<ElementRef>) {
    this.activeImg$.next();
    els.forEach((el) => {
      fromEvent(el.nativeElement, 'click')
        .pipe(
          untilDestroyed(this),
          takeUntil(this.activeImg$),
          map(() => {
            const target = el.nativeElement as HTMLElement;
            return {
              htmlEl: target,
              idx: Number(target.getAttribute('idx')),
            };
          })
        )
        .subscribe(({ idx }) => {
          this.editorAttachList = _.map(this.editorAttachList, (eaItem, i) => {
            const nwEaItem = eaItem;
            if (i === idx) {
              nwEaItem.filethumb = 'Y';
              this.bltInsParam.thumbid = _.toString(nwEaItem.attachid);
            } else {
              nwEaItem.filethumb = 'N';
            }
            return nwEaItem;
          });

          this.cdRef.detectChanges();
        });
    });
  }

  @ViewChildren('editorAddImgEl')
  private set editorAddImgEls(els: QueryList<ElementRef>) {
    this.editorAddImg$.next();
    els.forEach((el) => {
      fromEvent(el.nativeElement, 'click')
        .pipe(
          untilDestroyed(this),
          takeUntil(this.editorAddImg$),
          map(() => {
            const target = el.nativeElement as HTMLElement;
            return {
              htmlEl: target,
              idx: Number(target.getAttribute('idx')),
            };
          })
        )
        .subscribe(({ idx }) => {
          const { fileurl } = this.editorAttachList[idx];
          this.editorInsImg(fileurl);

          this.cdRef.detectChanges();
        });
    });
  }

  @ViewChildren('editorDelImgEl')
  private set editorDelImgEls(els: QueryList<ElementRef>) {
    this.editorDelImg$.next();
    els.forEach((el) => {
      fromEvent(el.nativeElement, 'click')
        .pipe(
          untilDestroyed(this),
          takeUntil(this.editorDelImg$),
          map(() => {
            const target = el.nativeElement as HTMLElement;
            return {
              htmlEl: target,
              idx: Number(target.getAttribute('idx')),
            };
          })
        )
        .subscribe(({ idx }) => {
          if (
            !window.confirm(
              '?????? ???????????? ?????????????????????????\n??????????????? ???????????? ????????? ???????????? ???????????????.'
            )
          ) {
            return;
          }

          this.editorDelImg(this.editorAttachList[idx], idx);
        });
    });
  }

  @ViewChild('updBtnEl', { read: ElementRef })
  private updBtnEl!: ElementRef;

  @ViewChild('listBtnEl', { read: ElementRef })
  private listBtnEl!: ElementRef;

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private cdRef: ChangeDetectorRef,
    private attachServ: AttachService,
    private bltServ: BltService
  ) {
    this.apiConfig = appConfig.apiConfig;
    this.config = {
      ...this.appConfig.editorConfig,
      uploadUrl: `${this.apiUrl}${this.appConfig.editorConfig.uploadUrl}`,
      filebrowserImageUploadUrl: `${this.apiUrl}${this.appConfig.editorConfig.filebrowserImageUploadUrl}`,
    };
  }

  ngOnInit(): void {
    this.uuid = CommonUtils.getUUID();

    this.plConfig = {
      id: 'uploader1',
      buttonSelect: '????????????',
      multipart: true,
      chunk_size: '100mb',
      multipart_params: {
        tblnm: 'hrpj_blt',
        editoryn: 'N',
        tblkey: this.bltid,
      },
    };

    this.editorPlConfig = {
      id: 'pl_editor1',
      buttonSelect: '????????????',
      multipart: true,
      chunk_size: '100mb',
      multipart_params: {
        tblnm: 'hrpj_blt',
        editoryn: 'Y',
        tblkey: this.bltid,
      },
    };
  }

  ngAfterViewInit(): void {
    fromEvent(this.updBtnEl.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.bltInsParam = {
          ...this.bltInsParam,

          cont: this.editorInstance.getData(),
        };
        if (!this.bltInsParam.thumbid && this.editorAttachList.length > 0) {
          this.bltInsParam.thumbid = _.toString(
            this.editorAttachList[0].attachid
          );
        }

        if (!this.bltInsParam.title) {
          alert('????????? ???????????????.');
          return;
        }

        this.plupload.doUpload();
      });

    fromEvent(this.listBtnEl.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.cancelEv.emit();
      });
  }

  ngOnDestroy(): void {
    this.activeImg$.next();
    this.editorAddImg$.next();
    this.editorDelImg$.next();

    this.bltIns$.next();
  }

  updBltApi(): void {
    this.bltServ
      .updBlt(this.bltInsParam)
      .pipe(untilDestroyed(this), takeUntil(this.bltIns$))
      .subscribe(() => {
        this.bltIns$.next();

        this.updProcEv.emit();
      });
  }

  editorReady(evt: CKEditor4.EventInfo): void {
    this.editorInstance = evt.editor;
  }

  fileUploadReq(evt: CKEditor4.EventInfo): void {
    this.attachServ.editorFileUploadReq(evt, {
      tblnm: 'hrpj_blt',
      editoryn: 'Y',
      tempkey: this.uuid,
    } as EditorUploadParam);
  }

  fileUploadRes(evt: CKEditor4.EventInfo): void {
    const attach = this.attachServ.editorFileUploadRes(evt);
    if (attach) {
      this.editorAttachList = _.concat(this.editorAttachList, [attach]);
    }
  }

  editorInsImg(img: string): void {
    this.editorInstance.insertHtml(`<img src="${img}" alt="" />`);
  }

  editorDelImg(item: AttachDesc, idx: number): void {
    const param = {} as AttachDelParam;
    if (item.attachid) {
      param.attachid = item.attachid;
    } else {
      param.tempkey = item.tempkey;
    }

    this.attachServ
      .delAttach(param)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        const regExp = new RegExp(
          `<img[^>]+src\\s*=\\s*['"]([^'"]+)${item.filesnm}['"][^>]*>`,
          'g'
        );
        const cont: string = this.editorInstance.getData().replace(regExp, '');
        this.bltInsParam.cont = cont;

        this.editorAttachList.splice(idx, 1);

        this.cdRef.detectChanges();
      });
  }

  editorPlComplete(plItem: UploadedItem): void {
    if (plItem.files.length > 0) {
      let htmlStr = '';
      _.forEach(plItem.files, (file: AttachDesc) => {
        htmlStr += `<p><img src="${file.fileurl}" alt="" /></p>`;
      });
      this.editorInstance.insertHtml(htmlStr);

      this.editorAttachList = _.concat(this.editorAttachList, plItem.files);
    }
  }
}
