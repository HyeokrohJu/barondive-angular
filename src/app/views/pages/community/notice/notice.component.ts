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
  ListTable,
  PageItem,
} from '@app/shared/interfaces';
import { APP_CONFIG, MOMENT_FULL_DATE } from '@app/shared/providers';
import { OauthUtils } from '@app/shared/utils';

/**
 * Notice Component
 *
 * @export
 * @class NoticeComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 * @implements {AfterViewInit}
 */
@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticeComponent implements OnInit, OnDestroy, AfterViewInit {
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

  public isSearch!: string;

  public nList: BltDesc[] = [] as BltDesc[];

  public nListTot!: number;

  public listConfig!: ListTable;

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
          this.router.navigate(['/community/notice'], {
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
          this.router.navigate(['/community/notice/insert'], {
            queryParams: { ...this.qParams, type: 'notice' },
          });
        });
    }
  }

  public isAuth: boolean | undefined;

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    @Inject(MOMENT_FULL_DATE) private momentFullDate: string,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private acRoute: ActivatedRoute,
    private bltServ: BltService
  ) {
    this.brdId = 'BRD0000004';
    this.currtPg = 1;
    this.itemPerPage = this.appConfig.brdConfig.listItemsPerPage;
    this.searchTxt = '';
    this.nListTot = 0;
    this.isSearch = '';

    this.bltParams = {
      brdid: this.brdId,
      currentPageNo: this.currtPg,
      itemsPerPage: this.itemPerPage,
    };

    this.listConfig = {
      dpCol: ['num', 'title', 'crenm', 'credate', 'clickcnt'],
      colNms: {
        num: {
          name: '번호',
          width: 60,
          type: 'num',
        },
        title: {
          name: '제목',
          width: 400,
          align: 'left',
          type: 'link',
        },
        crenm: {
          name: '작성자',
          width: 100,
        },
        credate: {
          name: '작성일',
          width: 150,
          type: 'date',
          format: this.momentFullDate,
        },
        clickcnt: {
          name: '조회수',
          width: 60,
        },
      },
    };
  }

  ngOnInit(): void {
    this.qParams = this.acRoute.snapshot.queryParams;
    this.currtPg = Number(this.qParams.currtPg) || 1;
    this.itemPerPage = Number(this.qParams.itemPerPage) || 20;
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
          this.router.navigate(['/community/notice'], {
            queryParams: {
              ...this.qParams,
              currtPg: 1,
              searchtype: 'title',
              searchtxt: this.searchTxt,
            },
          });
        } else {
          this.router.navigate(['/community/notice'], {
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
          this.router.navigate(['/community/notice'], {
            queryParams: {
              ...this.qParams,
              currtPg: 1,
              searchtype: 'title',
              searchtxt: this.searchTxt,
            },
          });
        } else {
          this.router.navigate(['/community/notice'], {
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
      nRes: this.bltServ.getBltList(this.bltParams),
    })
      .pipe(untilDestroyed(this), takeUntil(this.until$))
      .subscribe(({ nRes }) => {
        this.nList = nRes.selectBltPg || ([] as BltDesc[]);
        this.nListTot = nRes.selectBltCnt?.cnt || 0;
        this.listConfig.defNum =
          (nRes.selectBltCnt?.cnt || 0) - (this.currtPg - 1) * this.itemPerPage;

        this.cdRef.detectChanges();
      });
  }

  currtPgEv(pg: PageItem): void {
    this.router.navigate(['/community/notice'], {
      queryParams: { ...this.qParams, currtPg: pg.pageIndex + 1 },
    });
  }

  detailView(dataItem: unknown): void {
    const bltItem: BltDesc = dataItem as BltDesc;
    this.router.navigate(['/community/notice/detail'], {
      queryParams: { ...this.qParams, bltid: bltItem.bltid, type: 'notice' },
    });
  }
}
