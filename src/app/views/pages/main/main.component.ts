import { forkJoin, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import * as _ from 'lodash';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { BltService } from '@app/shared/api';
import { ApiBltRoot, BltDesc, BltParam } from '@app/shared/interfaces';
import { ListPortletData } from '@app/shared/components/list-portlet/interface';

/**
 * Main Component
 *
 * @export
 * @class MainComponent
 * @implements {OnInit}
 */
@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit, AfterViewInit {
  public bStoryList: BltDesc = {} as BltDesc;

  public tStoryList: BltDesc[] = [] as BltDesc[];

  public noticeList: ListPortletData[] = [] as ListPortletData[];

  public reviewList: ListPortletData[] = [] as ListPortletData[];

  @ViewChild('baronStoryMoreEl', { read: ElementRef })
  private baronStoryMoreEl!: ElementRef;

  @ViewChild('tourStoryMoreEl', { read: ElementRef })
  private tourStoryMoreEl!: ElementRef;

  @ViewChild('noticeMoreEl', { read: ElementRef })
  private noticeMoreEl!: ElementRef;

  @ViewChild('reviewMoreEl', { read: ElementRef })
  private reviewMoreEl!: ElementRef;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private bltServ: BltService
  ) {}

  ngOnInit(): void {
    this.apiCall();
  }

  ngAfterViewInit(): void {
    fromEvent(this.baronStoryMoreEl.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.router.navigate(['/story/baronstory']);
      });

    fromEvent(this.tourStoryMoreEl.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.router.navigate(['/story/tourstory']);
      });

    fromEvent(this.noticeMoreEl.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.router.navigate(['/community/notice']);
      });

    fromEvent(this.reviewMoreEl.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.router.navigate(['/community/review']);
      });
  }

  /**
   * API Call
   *
   * @memberof MainComponent
   */
  apiCall(): void {
    forkJoin({
      bStroyRes: this.bltServ.getBltList({
        brdid: 'BRD0000001',
        currentPageNo: 1,
        itemsPerPage: 1,
      }),
      tStroyRes: this.bltServ.getBltList({
        brdid: 'BRD0000002',
        currentPageNo: 1,
        itemsPerPage: 2,
      }),
      noticeRes: this.bltServ
        .getBltList({
          brdid: 'BRD0000004',
          currentPageNo: 1,
          itemsPerPage: 6,
        })
        .pipe(
          map((data: ApiBltRoot): ListPortletData[] => {
            const { selectBltPg } = data;
            return _.map(
              selectBltPg,
              (bltItem: BltDesc): ListPortletData => {
                let isNew = false;
                if (bltItem.credate) {
                  isNew = moment().diff(moment(bltItem.credate), 'days') < 7;
                }
                return {
                  brdid: bltItem.brdid,
                  bltid: bltItem.bltid,
                  title: bltItem.title,
                  dateTime: bltItem.credate,
                  isNew,
                  link: '',
                } as ListPortletData;
              }
            );
          })
        ),
      reviewRes: this.bltServ
        .getBltList({
          brdid: 'BRD0000005',
          currentPageNo: 1,
          itemsPerPage: 6,
        })
        .pipe(
          map((data: ApiBltRoot): ListPortletData[] => {
            const { selectBltPg } = data;
            return _.map(
              selectBltPg,
              (bltItem: BltDesc): ListPortletData => {
                let isNew = false;
                if (bltItem.credate) {
                  isNew = moment().diff(moment(bltItem.credate), 'days') < 7;
                }
                return {
                  brdid: bltItem.brdid,
                  bltid: bltItem.bltid,
                  title: bltItem.title,
                  dateTime: bltItem.credate,
                  isNew,
                  link: '',
                } as ListPortletData;
              }
            );
          })
        ),
    })
      .pipe(untilDestroyed(this))
      .subscribe(({ bStroyRes, tStroyRes, noticeRes, reviewRes }) => {
        [this.bStoryList] = bStroyRes.selectBltPg || ([] as BltDesc[]);
        this.tStoryList = tStroyRes.selectBltPg || ([] as BltDesc[]);
        this.noticeList = noticeRes;
        this.reviewList = reviewRes;

        this.cdRef.detectChanges();
      });
  }

  pageChange(bltParam: BltParam): void {
    switch (bltParam.brdid) {
      case 'BRD0000001': {
        this.router.navigate(['/story/baronstory/detail'], {
          queryParams: { bltid: bltParam.bltid, type: 'baronstory' },
        });
        break;
      }
      case 'BRD0000002': {
        this.router.navigate(['/story/tourstory/detail'], {
          queryParams: { bltid: bltParam.bltid, type: 'tourstory' },
        });
        break;
      }
      case 'BRD0000004': {
        this.router.navigate(['/community/notice/detail'], {
          queryParams: { bltid: bltParam.bltid, type: 'notice' },
        });
        break;
      }
      case 'BRD0000005': {
        this.router.navigate(['/community/review/detail'], {
          queryParams: { bltid: bltParam.bltid, type: 'review' },
        });
        break;
      }
      default:
        break;
    }
  }
}
