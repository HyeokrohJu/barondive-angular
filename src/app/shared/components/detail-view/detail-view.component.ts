import { fromEvent, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import {
  ApiConfig,
  AppConfig,
  AttachDesc,
  BltDesc,
  BltParam,
} from '@app/shared/interfaces';
import { APP_CONFIG, MOMENT_FULL_DATE } from '@app/shared/providers';
import { BltService } from '@app/shared/api';

/**
 * Detail View Component
 *
 * @export
 * @class DetailViewComponent
 */
@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailViewComponent implements OnDestroy {
  private _descItem!: BltDesc;

  private untilUpdBltCnt$: Subject<void> = new Subject<void>();

  @Input()
  public get descItem(): BltDesc {
    return this._descItem;
  }

  public set descItem(bltDesc: BltDesc) {
    this._descItem = bltDesc;

    if (bltDesc) {
      this.untilUpdBltCnt$.next();
      this.bltServ
        .updBltCnt({
          brdid: bltDesc.brdid,
          bltid: bltDesc.bltid,
        } as BltParam)
        .pipe(untilDestroyed(this), takeUntil(this.untilUpdBltCnt$))
        .subscribe((isUpd) => {
          this.untilUpdBltCnt$.next();
          if (isUpd) {
            const nwBltDesc = bltDesc;
            nwBltDesc.clickcnt += 1;
            this._descItem = nwBltDesc;
          }

          this.cdRef.detectChanges();
        });
    }
  }

  @Input()
  public attachItem: AttachDesc[] = [] as AttachDesc[];

  private apiConfig: ApiConfig = {} as ApiConfig;

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

  @ViewChildren('attachBtnEl')
  private set attachBtnEls(els: QueryList<ElementRef> | undefined) {
    els?.forEach((el) => {
      fromEvent(el.nativeElement, 'click')
        .pipe(
          untilDestroyed(this),
          map((ev) => {
            const target = (ev as MouseEvent).target as HTMLElement;
            return {
              htmlEl: target,
              attachItem: this.attachItem[Number(target.getAttribute('idx'))],
            };
          })
        )
        .subscribe(({ attachItem }) => {
          window.open(
            `${this.apiUrl}/attach/attachDownload?attachid=${attachItem.attachid}`,
            '_self'
          );
        });
    });
  }

  constructor(
    @Inject(MOMENT_FULL_DATE) public momentFullDate: string,
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
    private cdRef: ChangeDetectorRef,
    private bltServ: BltService
  ) {
    this.apiConfig = appConfig.apiConfig;
  }

  ngOnDestroy(): void {
    this.untilUpdBltCnt$.next();
  }
}
