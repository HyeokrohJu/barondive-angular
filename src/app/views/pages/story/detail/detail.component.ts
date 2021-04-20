import { forkJoin, fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { APP_CONFIG, MOMENT_FULL_DATE } from '@app/shared/providers';
import { AttachService, BltcmntService, BltService } from '@app/shared/api';
import {
  AppConfig,
  AttachDesc,
  BltcmntDesc,
  BltcmntParam,
  BltDesc,
  BltParam,
  PageItem,
} from '@app/shared/interfaces';
import { OauthUtils } from '@app/shared/utils';

/**
 * Story 관련 상세 페이지
 *
 * @export
 * @class DetailComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
 */
@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit, AfterViewInit, OnDestroy {
  private bltParam!: BltParam;

  public qParams: Params | undefined;

  public bltDesc!: BltDesc;

  public attachList: AttachDesc[] = [] as AttachDesc[];

  public cmntList: BltcmntDesc[] = [] as BltcmntDesc[];

  public cmntParam!: BltcmntParam;

  public cmntTot!: number;

  private pType!: string;

  @ViewChildren('listBtnEl', { read: ElementRef })
  private listBtnEls!: QueryList<ElementRef>;

  @ViewChildren('editBtnEl', { read: ElementRef })
  private editBtnEls!: QueryList<ElementRef>;

  @ViewChildren('delBtnEl', { read: ElementRef })
  private delBtnEls!: QueryList<ElementRef>;

  public isAuth: boolean | undefined;

  private untilBtn$: Subject<void> = new Subject<void>();

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    @Inject(MOMENT_FULL_DATE) private momentFullDate: string,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private acRoute: ActivatedRoute,
    private bltServ: BltService,
    private attachServ: AttachService,
    private bltcmntServ: BltcmntService
  ) {
    this.bltParam = {
      brdid: 'BRD0000001',
      bltid: 0,
    };

    this.cmntParam = {
      ...this.bltParam,
      itemsPerPage: this.appConfig.brdConfig.cmntItemsPerPage,
      currentPageNo: 1,
    };
  }

  ngOnInit(): void {
    this.qParams = this.acRoute.snapshot.queryParams;
    this.bltParam.bltid = Number(this.qParams.bltid);
    this.pType = this.qParams.type || 'baronstory';
    if (this.pType === 'tourstory') {
      this.bltParam.brdid = 'BRD0000002';
    } else {
      this.bltParam.brdid = 'BRD0000001';
    }
    this.cmntParam = {
      ...this.cmntParam,
      ...this.bltParam,
    };

    this.apiCall();
    this.apiCmntCall();
  }

  ngAfterViewInit(): void {
    this.elEv();
  }

  ngOnDestroy(): void {
    this.untilBtn$.next();
  }

  elEv(): void {
    this.untilBtn$.next();
    this.listBtnEls.forEach((el) => {
      fromEvent(el.nativeElement, 'click')
        .pipe(untilDestroyed(this), takeUntil(this.untilBtn$))
        .subscribe(() => {
          this.router.navigate([`/story/${this.pType}`], {
            queryParams: { ...this.qParams, bltid: null, type: null },
          });
        });
    });

    this.editBtnEls.forEach((el) => {
      fromEvent(el.nativeElement, 'click')
        .pipe(untilDestroyed(this), takeUntil(this.untilBtn$))
        .subscribe(() => {
          this.router.navigate([`/story/${this.pType}/update`], {
            queryParams: { ...this.qParams },
          });
        });
    });

    this.delBtnEls.forEach((el) => {
      fromEvent(el.nativeElement, 'click')
        .pipe(untilDestroyed(this), takeUntil(this.untilBtn$))
        .subscribe(() => {
          if (!window.confirm('해당 게시물을 삭제 하시겠습니까?')) {
            return;
          }
          this.apiBltDelCall();
        });
    });
  }

  apiCall(): void {
    forkJoin({
      rRes: this.bltServ.getBltDesc(this.bltParam),
      aRes: this.attachServ.getAttachList({
        tblnm: 'hrpj_blt',
        tblkey: this.bltParam.bltid,
        editoryn: 'N',
      }),
    })
      .pipe(untilDestroyed(this))
      .subscribe(({ rRes, aRes }) => {
        this.isAuth = OauthUtils.isAuthChk(rRes.creid);
        this.bltDesc = rRes;
        this.attachList = aRes;

        this.cdRef.detectChanges();
        this.elEv();
      });
  }

  apiCmntCall(): void {
    forkJoin({
      cRes: this.bltcmntServ.getBltcmntDesc(this.cmntParam),
    })
      .pipe(untilDestroyed(this))
      .subscribe(({ cRes }) => {
        this.cmntList = cRes.selectBltcmntPg;
        this.cmntTot = cRes.selectBltcmntCnt.cnt;

        this.cdRef.detectChanges();
      });
  }

  apiBltDelCall(): void {
    forkJoin({
      dRes: this.bltServ.delBlt({
        brdid: this.bltParam.brdid,
        bltid: this.bltParam.bltid,
      }),
    })
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.router.navigate([`/story/${this.pType}`], {
          queryParams: { ...this.qParams, currtPg: 1, bltid: null, type: null },
        });
      });
  }

  cmntPageChange(pg: PageItem): void {
    this.cmntParam.currentPageNo = pg.pageIndex + 1;
    this.apiCmntCall();
  }
}
