import { forkJoin, fromEvent, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { BltService } from '@app/shared/api';
import {
  AppConfig,
  BltDesc,
  BltListParam,
  PageItem,
} from '@app/shared/interfaces';
import { APP_CONFIG } from '@app/shared/providers';
import { OauthUtils } from '@app/shared/utils';

/**
 * TourStory Component
 *
 * @export
 * @class TourstoryComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 * @implements {AfterViewInit}
 */
@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-tourstory',
  templateUrl: './tourstory.component.html',
  styleUrls: ['./tourstory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TourstoryComponent implements OnInit, OnDestroy, AfterViewInit {
  private brdId!: string;

  public qParams: Params | undefined;

  public bltParams!: BltListParam;

  public currtPg!: number;

  public itemPerPage!: number;

  public get currtPgIdx(): number {
    return this.currtPg - 1;
  }

  public searchTxt: string;

  private until$: Subject<void> = new Subject<void>();

  private clsUntil$: Subject<void> = new Subject<void>();

  public width: string;

  public height: string;

  public isSearch!: string;

  public tStoryList: BltDesc[] = [] as BltDesc[];

  public tStoryListTot!: number;

  @ViewChild('searchBtnEl', { read: ElementRef })
  private searchBtnEl!: ElementRef;

  @ViewChild('searchEvEl', { read: ElementRef })
  private searchEvEl!: ElementRef;

  @ViewChild('searchInputEl')
  private searchInputEl!: ElementRef;

  @ViewChild('searchClearEl', { read: ElementRef })
  private set searchClearEl(el: ElementRef) {
    if (el?.nativeElement) {
      this.clsUntil$.next();
      fromEvent(el.nativeElement, 'click')
        .pipe(untilDestroyed(this), takeUntil(this.clsUntil$))
        .subscribe(() => {
          this.router.navigate(['/story/tourstory'], {
            queryParams: {
              ...this.qParams,
              searchtype: null,
              searchtxt: null,
            },
          });
        });
    }
  }

  @ViewChild('insBtnEl', { read: ElementRef })
  private set insBtnEl(el: ElementRef) {
    if (el) {
      fromEvent(el.nativeElement, 'click')
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.router.navigate(['/story/tourstory/insert'], {
            queryParams: { ...this.qParams, type: 'tourstory' },
          });
        });
    }
  }

  public isAuth: boolean | undefined;

  public get isMobile(): boolean {
    return window.innerWidth < 757;
  }

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private acRoute: ActivatedRoute,
    private bltServ: BltService
  ) {
    this.brdId = 'BRD0000002';
    this.currtPg = 1;
    this.itemPerPage = this.appConfig.brdConfig.imgItemsPerPage;
    this.searchTxt = '';
    this.tStoryListTot = 0;
    this.isSearch = '';
    if (this.isMobile) {
      this.width = 'auto';
      this.height = '200px';
    } else {
      this.width = '250px';
      this.height = '160px';
    }

    this.bltParams = {
      brdid: this.brdId,
      currentPageNo: this.currtPg,
      itemsPerPage: this.itemPerPage,
    };
  }

  ngOnInit(): void {
    this.qParams = this.acRoute.snapshot.queryParams;
    this.currtPg = Number(this.qParams.currtPg) || 1;
    this.itemPerPage = Number(this.qParams.itemPerPage) || 12;
    this.isAuth = OauthUtils.isAuthChk();

    this.bltParams = {
      brdid: this.brdId,
      currentPageNo: this.currtPg,
      itemsPerPage: this.itemPerPage,
    };

    this.initRouter();
  }

  ngAfterViewInit(): void {
    this.initElEvt();
  }

  ngOnDestroy(): void {
    this.until$.next();
    this.clsUntil$.next();
  }

  initRouter(): void {
    this.acRoute.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((qParam: Params) => {
        this.qParams = qParam;
        this.until$.next();
        this.currtPg = Number(qParam.currtPg) || 1;

        if (qParam.searchtxt) {
          this.bltParams = {
            ...this.bltParams,
            currentPageNo: this.currtPg,
            searchtype: 'title',
            searchtxt: qParam.searchtxt,
          };
        } else {
          this.searchTxt = '';
          this.isSearch = '';
          this.bltParams = {
            ...this.bltParams,
            currentPageNo: this.currtPg,
          };
          delete this.bltParams.searchtype;
          delete this.bltParams.searchtxt;
        }

        this.apiCall();
      });
  }

  initElEvt(): void {
    fromEvent(this.searchBtnEl.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.isSearch = this.isSearch === 'up' ? 'down' : 'up';

        this.cdRef.detectChanges();
      });

    fromEvent(this.searchEvEl.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        if (this.searchTxt) {
          this.router.navigate(['/story/tourstory'], {
            queryParams: {
              ...this.qParams,
              currtPg: 1,
              searchtype: 'title',
              searchtxt: this.searchTxt,
            },
          });
        } else {
          this.router.navigate(['/story/tourstory'], {
            queryParams: {
              ...this.qParams,
              searchtype: null,
              searchtxt: null,
            },
          });
        }
      });

    fromEvent(this.searchInputEl.nativeElement, 'keydown')
      .pipe(
        debounceTime(150),
        filter((e: unknown) => {
          const ev: KeyboardEvent = e as KeyboardEvent;
          return ev.key === 'Enter';
        }),
        untilDestroyed(this)
      )
      .subscribe(() => {
        if (this.searchTxt) {
          this.router.navigate(['/story/tourstory'], {
            queryParams: {
              ...this.qParams,
              currtPg: 1,
              searchtype: 'title',
              searchtxt: this.searchTxt,
            },
          });
        } else {
          this.router.navigate(['/story/tourstory'], {
            queryParams: {
              ...this.qParams,
              searchtype: null,
              searchtxt: null,
            },
          });
        }
      });
  }

  apiCall(): void {
    forkJoin({
      tStroyRes: this.bltServ.getBltList(this.bltParams),
    })
      .pipe(untilDestroyed(this), takeUntil(this.until$))
      .subscribe(({ tStroyRes }) => {
        this.tStoryList = tStroyRes.selectBltPg || ([] as BltDesc[]);
        this.tStoryListTot = tStroyRes.selectBltCnt?.cnt || 0;

        this.cdRef.detectChanges();
      });
  }

  currtPgEv(pg: PageItem): void {
    this.router.navigate(['/story/tourstory'], {
      queryParams: { ...this.qParams, currtPg: pg.pageIndex + 1 },
    });
  }

  detailView(dataItem: BltDesc): void {
    this.router.navigate(['/story/tourstory/detail'], {
      queryParams: {
        ...this.qParams,
        bltid: dataItem.bltid,
        type: 'tourstory',
      },
    });
  }
}
