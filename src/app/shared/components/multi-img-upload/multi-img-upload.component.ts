import * as _ from 'lodash';

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import {
  ApiConfig,
  AppConfig,
  AttachDesc,
  PluploadConfig,
  UploadedItem,
} from '@app/shared/interfaces';
import { APP_CONFIG } from '@app/shared/providers';
import { LazyLoadLibService } from '@app/shared/services';

declare let plupload: any;

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-multi-img-upload',
  templateUrl: './multi-img-upload.component.html',
  styleUrls: ['./multi-img-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiImgUploadComponent {
  @Output()
  public uploadCompleteEv: EventEmitter<UploadedItem> = new EventEmitter<UploadedItem>();

  @Input()
  public set config(conf: PluploadConfig) {
    this.plConfig = {
      ...this.plConfig,

      ...conf,
    };
    this.containerId = `plupload_${conf.id}`;
  }

  public plConfig: PluploadConfig;

  public containerId!: string;

  public uploader: any;

  public uploadState: boolean | undefined;

  private apiConfig: ApiConfig = {} as ApiConfig;

  private files: AttachDesc[] = [] as AttachDesc[];

  private eventList: string[] = [
    'PostInit',
    'Browse',
    'Refresh',
    'QueueChanged',
    'OptionChanged',
    'BeforeUpload',
    'FileFiltered',
    'ChunkUploaded',
    'Destroy',
    'Error',
  ];

  @ViewChild('pluploadBtnEl', { read: ElementRef })
  private set pluploadBtnEl(el: ElementRef) {
    this.addPlupload(el);
  }

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

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private lazyLoadLib: LazyLoadLibService,
    private cdRef: ChangeDetectorRef
  ) {
    this.apiConfig = appConfig.apiConfig;

    this.plConfig = {
      id: '',
      buttonSelect: '파일선택',
      multi_selection: true,
      multipart: true,
      chunk_size: '100mb',
      runtimes: 'html5, flash, silverlight, html4',
      flash_swf_url: '/assets/extlib/plupload-3.1.2/js/Moxie.swf',
      silverlight_xap_url: '/assets/extlib/plupload-3.1.2/js/Moxie.xap',
      url: `${this.apiUrl}/attach/uploadAttach`,
    };
  }

  addPlupload(el: ElementRef): void {
    this.lazyLoadLib
      .loadScript('/assets/extlib/plupload-3.1.2/js/plupload.full.min.js')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        if (!this.uploader) {
          this.initPlupload(el);
        }
      });
  }

  initPlupload(el: ElementRef): void {
    this.uploader = new plupload.Uploader({
      ...this.plConfig,

      container: this.containerId,
      browse_button: el.nativeElement,
    });

    this.uploader.init();

    this.initEventBind();
  }

  initEventBind(): void {
    _.forEach(
      this.config,
      (event: () => void | string | boolean | any | any[], key: string) => {
        if (_.isFunction(event) && _.indexOf(this.eventList, key) > -1) {
          this.uploader.bind(key, event);
        }
      }
    );

    this.uploader.bind('FilesAdded', () => {
      this.uploader.start();

      this.cdRef.detectChanges();
    });

    this.uploader.bind('StateChanged', (up: any) => {
      if (up.state === plupload.STARTED && !this.uploadState) {
        this.uploadState = true;
      }
      if (up.state !== plupload.STARTED && this.uploadState) {
        this.uploadState = false;
      }

      this.cdRef.detectChanges();
    });

    this.uploader.bind(
      'FileUploaded',
      (
        up: any,
        file: any,
        result: { response: string; status: number; responseHeaders: string }
      ) => {
        const resJson = JSON.parse(result.response);
        const { resMap } = resJson;
        this.files.push(resMap as AttachDesc);
      }
    );

    this.uploader.bind('UploadComplete', (up: any) => {
      this.uploadCompleteEv.emit({ uploader: up, files: this.files });

      this.files = [];
    });
  }
}
