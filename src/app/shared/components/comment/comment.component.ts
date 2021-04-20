import { fromEvent, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Inject,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  OnDestroy,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import {
  BltcmntDelParam,
  BltcmntDesc,
  BltcmntInsParam,
  BltcmntParam,
  BltcmntUpdParam,
  PageItem,
} from '@app/shared/interfaces';
import { MOMENT_FULL_DATE } from '@app/shared/providers';
import { BltcmntService } from '@app/shared/api';
import { OauthUtils } from '@app/shared/utils';

/**
 * Comment Component
 *
 * @export
 * @class CommentComponent
 */
@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnDestroy, AfterViewInit {
  @Output()
  public pgChangeEv: EventEmitter<PageItem> = new EventEmitter<PageItem>();

  @Input()
  public cmntParam!: BltcmntParam;

  @Input()
  public cmntItem: BltcmntDesc[] = [] as BltcmntDesc[];

  @Input()
  public cmntSize!: number;

  @ViewChild('cmntEl')
  private cmntEl: ElementRef | undefined;

  public get currtPgIdx(): number {
    return this.cmntParam.currentPageNo - 1;
  }

  private untilCmntEdit$: Subject<void> = new Subject<void>();

  private untilCmntEditCancel$: Subject<void> = new Subject<void>();

  private untilCmntReply$: Subject<void> = new Subject<void>();

  private untilCmntReplyCancel$: Subject<void> = new Subject<void>();

  private untilCmntUpdBtn$: Subject<void> = new Subject<void>();

  private untilCmntDelBtn$: Subject<void> = new Subject<void>();

  private untilCmntReplyBtn$: Subject<void> = new Subject<void>();

  private untilCmntIns$: Subject<void> = new Subject<void>();

  private untilCmntUpd$: Subject<void> = new Subject<void>();

  private untilCmntDel$: Subject<void> = new Subject<void>();

  public cmntEditIdx: number | undefined;

  public cmntReplyIdx: number | undefined;

  public cmntDelIdx: number | undefined;

  public cmntInsStr!: string;

  public cmntUpdStr!: string;

  public cmntReplyStr!: string;

  @ViewChildren('cmntEditBtnEl', { read: ElementRef })
  private set cmntEditBtnEls(els: QueryList<ElementRef>) {
    this.untilCmntEdit$.next();
    els.forEach((el) => {
      fromEvent(el.nativeElement, 'click')
        .pipe(
          untilDestroyed(this),
          takeUntil(this.untilCmntEdit$),
          map(() => {
            const target = el.nativeElement as HTMLElement;
            return {
              htmlEl: target,
              idx: Number(target.getAttribute('idx')),
            };
          })
        )
        .subscribe(({ idx }) => {
          this.cmntEditIdx = idx;
          this.cmntUpdStr = (_.find(this.cmntItem, {
            cmntid: idx,
          }) as BltcmntDesc).cmnt;
          this.cmntReplyIdx = undefined;
          this.cmntReplyStr = '';

          this.cdRef.detectChanges();
        });
    });
  }

  @ViewChildren('cmntEdtCancelBtnEl', { read: ElementRef })
  private set cmntEdtCancelBtnEls(els: QueryList<ElementRef>) {
    this.untilCmntEditCancel$.next();
    els.forEach((el) => {
      fromEvent(el.nativeElement, 'click')
        .pipe(untilDestroyed(this), takeUntil(this.untilCmntEditCancel$))
        .subscribe(() => {
          this.cmntEditIdx = undefined;
          this.cmntUpdStr = '';
          this.cmntReplyIdx = undefined;
          this.cmntReplyStr = '';

          this.cdRef.detectChanges();
        });
    });
  }

  @ViewChildren('cmntReplyBtnEl', { read: ElementRef })
  private set cmntReplyBtnEls(els: QueryList<ElementRef>) {
    this.untilCmntReply$.next();
    els.forEach((el) => {
      fromEvent(el.nativeElement, 'click')
        .pipe(
          untilDestroyed(this),
          takeUntil(this.untilCmntReply$),
          map(() => {
            const target = el.nativeElement as HTMLElement;
            return {
              htmlEl: target,
              idx: Number(target.getAttribute('idx')),
            };
          })
        )
        .subscribe(({ idx }) => {
          this.cmntEditIdx = undefined;
          this.cmntUpdStr = '';
          this.cmntReplyIdx = idx;
          this.cmntReplyStr = '';

          this.cdRef.detectChanges();
        });
    });
  }

  @ViewChildren('cmntReplyCancelBtnEl', { read: ElementRef })
  private set cmntReplyCancelBtnEl(els: QueryList<ElementRef>) {
    this.untilCmntReplyCancel$.next();
    els.forEach((el) => {
      fromEvent(el.nativeElement, 'click')
        .pipe(untilDestroyed(this), takeUntil(this.untilCmntReplyCancel$))
        .subscribe(() => {
          this.cmntReplyIdx = undefined;
          this.cmntReplyStr = '';

          this.cdRef.detectChanges();
        });
    });
  }

  @ViewChildren('cmntUpdBtnEl', { read: ElementRef })
  private set untilCmntUpdBtn(els: QueryList<ElementRef>) {
    this.untilCmntReplyCancel$.next();
    els.forEach((el) => {
      fromEvent(el.nativeElement, 'click')
        .pipe(untilDestroyed(this), takeUntil(this.untilCmntUpdBtn$))
        .subscribe(() => {
          this.updCmntApi();
        });
    });
  }

  @ViewChildren('cmntDelBtnEl', { read: ElementRef })
  private set cmntDelBtnEls(els: QueryList<ElementRef>) {
    this.untilCmntDelBtn$.next();
    els.forEach((el) => {
      fromEvent(el.nativeElement, 'click')
        .pipe(
          untilDestroyed(this),
          takeUntil(this.untilCmntDelBtn$),
          map(() => {
            const target = el.nativeElement as HTMLElement;
            return {
              htmlEl: target,
              idx: Number(target.getAttribute('idx')),
            };
          })
        )
        .subscribe(({ idx }) => {
          this.cmntDelIdx = idx;
          this.delCmntApi();
        });
    });
  }

  @ViewChildren('cmntReplyInsBtnEl', { read: ElementRef })
  private set cmntReplyInsBtnEls(els: QueryList<ElementRef>) {
    this.untilCmntReplyBtn$.next();
    els.forEach((el) => {
      fromEvent(el.nativeElement, 'click')
        .pipe(untilDestroyed(this), takeUntil(this.untilCmntReplyBtn$))
        .subscribe(() => {
          this.replyCmntApi();
        });
    });
  }

  @ViewChild('cmntInsBtnEl')
  private cmntInsBtnEl!: ElementRef;

  constructor(
    @Inject(MOMENT_FULL_DATE) public momentFullDate: string,
    private cdRef: ChangeDetectorRef,
    private bltcmntServ: BltcmntService
  ) {
    this.cmntInsStr = '';
    this.cmntUpdStr = '';
    this.cmntReplyStr = '';
  }

  ngOnDestroy(): void {
    this.untilCmntEdit$.next();
    this.untilCmntEditCancel$.next();
    this.untilCmntReply$.next();
    this.untilCmntReplyCancel$.next();
    this.untilCmntUpdBtn$.next();
    this.untilCmntDelBtn$.next();
    this.untilCmntReplyBtn$.next();

    this.untilCmntIns$.next();
    this.untilCmntUpd$.next();
    this.untilCmntDel$.next();
  }

  ngAfterViewInit(): void {
    fromEvent(this.cmntInsBtnEl.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.insCmntApi();
      });
  }

  insCmntApi(): void {
    if (!this.cmntInsStr) {
      alert('댓글을 입력하세요');
      return;
    }

    this.untilCmntIns$.next();
    const params: BltcmntInsParam = {
      brdid: this.cmntParam.brdid,
      bltid: this.cmntParam.bltid,
      state: 'Y',
      rcmdcnt: '0',
      cmnt: this.cmntInsStr,
    };

    this.bltcmntServ
      .insBltcmnt(params)
      .pipe(untilDestroyed(this), takeUntil(this.untilCmntIns$))
      .subscribe(() => {
        this.untilCmntIns$.next();
        this.cmntInsStr = '';

        const pg: PageItem = {
          pageIndex: 0,
          pageSize: this.cmntParam.itemsPerPage,
          length: this.cmntSize,
        };

        this.pgChangeEv.emit(pg);

        this.cmntEl?.nativeElement.scrollIntoView();
      });
  }

  updCmntApi(): void {
    if (!this.cmntUpdStr) {
      alert('댓글을 입력하세요');
      return;
    }

    this.untilCmntUpd$.next();
    const params: BltcmntUpdParam = {
      cmntid: this.cmntEditIdx as number,
      cmnt: this.cmntUpdStr,
    };

    this.bltcmntServ
      .updBltcmnt(params)
      .pipe(untilDestroyed(this), takeUntil(this.untilCmntUpd$))
      .subscribe(() => {
        this.untilCmntUpd$.next();
        this.cmntUpdStr = '';
        this.cmntEditIdx = undefined;

        const pg: PageItem = {
          pageIndex: this.currtPgIdx,
          pageSize: this.cmntParam.itemsPerPage,
          length: this.cmntSize,
        };

        this.pgChangeEv.emit(pg);
      });
  }

  delCmntApi(): void {
    if (!window.confirm('댓글을 삭제 하시겠습니까?')) {
      this.cmntDelIdx = undefined;
      return;
    }

    this.untilCmntDel$.next();
    const params: BltcmntDelParam = {
      cmntid: this.cmntDelIdx as number,
      state: 'D',
      return: -1,
    };

    this.bltcmntServ
      .delBltcmnt(params)
      .pipe(untilDestroyed(this), takeUntil(this.untilCmntDel$))
      .subscribe(() => {
        this.cmntDelIdx = undefined;
        this.untilCmntDel$.next();

        const pg: PageItem = {
          pageIndex: this.currtPgIdx,
          pageSize: this.cmntParam.itemsPerPage,
          length: this.cmntSize,
        };

        this.pgChangeEv.emit(pg);
      });
  }

  replyCmntApi(): void {
    if (!this.cmntReplyStr) {
      alert('답글을 입력하세요');
      return;
    }

    this.untilCmntIns$.next();
    const params: BltcmntInsParam = {
      brdid: this.cmntParam.brdid,
      bltid: this.cmntParam.bltid,
      state: 'Y',
      rcmdcnt: '0',
      cmnt: this.cmntReplyStr,
      currtcmntid: this.cmntReplyIdx,
    };

    this.bltcmntServ
      .insBltcmnt(params)
      .pipe(untilDestroyed(this), takeUntil(this.untilCmntIns$))
      .subscribe(() => {
        this.untilCmntIns$.next();
        this.cmntInsStr = '';
        this.cmntReplyIdx = undefined;

        const pg: PageItem = {
          pageIndex: this.currtPgIdx,
          pageSize: this.cmntParam.itemsPerPage,
          length: this.cmntSize,
        };

        this.pgChangeEv.emit(pg);
      });
  }

  currtPgEv(pg: PageItem): void {
    this.pgChangeEv.emit(pg);

    this.cmntEl?.nativeElement.scrollIntoView();
  }

  isAuth(creid: string): boolean {
    return OauthUtils.isAuthChk(creid);
  }
}
