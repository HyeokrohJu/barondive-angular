import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
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
import { AttachService } from '@app/shared/api';
import { LazyLoadLibService } from '@app/shared/services';
import { CommonUtils } from '@app/shared/utils';

declare let plupload: any;

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-plupload',
  templateUrl: './plupload.component.html',
  styleUrls: ['./plupload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PluploadComponent implements OnDestroy {
  @Output()
  public uploadCompleteEv: EventEmitter<UploadedItem> = new EventEmitter<UploadedItem>();

  @Input()
  public set doneFiles(files: AttachDesc[]) {
    if (files) {
      this.files = _.map(files, (file) => {
        return {
          ...file,
          sizeStr: file.filesize,
          name: file.filenm,
          uploaded: true,
          id: file.attachid,
        };
      });
    }
  }

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

  public files: any[] = [] as any[];

  public uploadState: boolean | undefined;

  public progress: { [key: string]: number } = {} as { [key: string]: number };

  private untilDel$: Subject<void> = new Subject<void>();

  private apiConfig: ApiConfig = {} as ApiConfig;

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
    private cdRef: ChangeDetectorRef,
    private attachServ: AttachService
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

  ngOnDestroy(): void {
    this.untilDel$.next();
    if (this.uploader) {
      this.uploader.destroy();
    }
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

    this.uploader.bind('FilesAdded', (up: any, files: any[]) => {
      const { multi_selection: multiSelection } = this.plConfig;
      if (!multiSelection) {
        this.clearAllFiles();
      } else {
        this.clearFailedFiles();
      }

      this.files = _.map(_.concat(this.files, files), (file) => {
        return {
          ...file,
          sizeStr: CommonUtils.convertBytes(file.size),
        };
      });

      if (this.plConfig.autoUpload) {
        this.uploader.start();
      }

      this.cdRef.detectChanges();
    });

    this.uploader.bind('FilesRemoved', (up: any, files: any[]) => {
      this.files = _.filter(
        this.files,
        (file) => _.find(files, { id: file.id }) !== -1
      );

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

    this.uploader.bind('FileUploaded', (up: any, file: any) => {
      _.forEach(this.files, (val, key) => {
        if (val.id === file.id) {
          const v = val;
          v.uploaded = true;
          this.files[key] = v;
        }
      });

      this.cdRef.detectChanges();
    });

    this.uploader.bind('UploadProgress', (up: any, file: any) => {
      this.progress[file.id] = file.percent;

      this.cdRef.detectChanges();
    });

    this.uploader.bind('UploadComplete', (up: any, files: any[]) => {
      this.uploadCompleteEv.emit({ uploader: up, files });
    });
  }

  clearAllFiles(): void {
    _.forEach(this.files, (file) => {
      this.uploader.removeFile(file.id);
    });
  }

  clearFailedFiles(): void {
    this.files = _.filter(this.files, (file) => {
      if (file.error) {
        this.uploader.removeFile(file.id);
      }
      return !file.error;
    });
  }

  removeFile(id: string): void {
    this.uploader.removeFile(id);
    this.files = _.filter(this.files, (file) => file.id !== id);
  }

  fileRemove(file: any): void {
    if (!this.uploadState && !file.uploaded) {
      this.removeFile(file.id);

      this.cdRef.detectChanges();
    } else {
      if (
        !window.confirm(
          '해당 파일을 삭제하시겠습니까?\n삭제 할 경우 복구가 불가능 합니다.'
        )
      ) {
        return;
      }
      this.untilDel$.next();
      this.attachServ
        .delAttach({ attachid: file.id })
        .pipe(takeUntil(this.untilDel$))
        .subscribe(() => {
          this.files = _.filter(this.files, (f) => {
            return f.attachid !== file.id;
          });

          this.cdRef.detectChanges();
        });
    }
  }

  doUpload(): void {
    if (this.uploader.files.length > 0) {
      this.uploader.start();
    } else {
      this.uploadCompleteEv.emit({
        uploader: this.uploader,
        files: this.files,
      });
    }
  }
}
