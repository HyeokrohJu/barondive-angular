import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { OauthUtils } from '@app/shared/utils';

/**
 * 상단 SNS 영역 Component
 *
 * @export
 * @class TopSnsComponent
 * @implements {AfterViewInit}
 */
@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-top-sns',
  templateUrl: './top-sns.component.html',
  styleUrls: ['./top-sns.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopSnsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('facebookEl', { static: false })
  public facebookEl: ElementRef | undefined;

  @ViewChild('instagramEl', { static: false })
  public instagramEl: ElementRef | undefined;

  @ViewChild('mypageEl', { static: false })
  public mypageEl: ElementRef | undefined;

  private untilLogin$: Subject<void> = new Subject<void>();

  @ViewChild('loginEl')
  public set loginEl(el: ElementRef) {
    if (el) {
      this.untilLogin$.next();
      fromEvent(el.nativeElement, 'click')
        .pipe(untilDestroyed(this), takeUntil(this.untilLogin$))
        .subscribe(() => {
          this.router.navigate(['/any/login']);
        });
    }
  }

  private untilLogout$: Subject<void> = new Subject<void>();

  @ViewChild('logoutEl')
  public set logoutEl(el: ElementRef) {
    if (el) {
      this.untilLogout$.next();
      fromEvent(el.nativeElement, 'click')
        .pipe(untilDestroyed(this), takeUntil(this.untilLogout$))
        .subscribe(() => {
          OauthUtils.removeToken();
          this.isToken = OauthUtils.isToken();
          this.cdRef.detectChanges();

          this.router.navigate(['/']);
        });
    }
  }

  public isToken: boolean | undefined;

  constructor(private router: Router, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.isToken = OauthUtils.isToken();
  }

  ngAfterViewInit(): void {
    this.elEvt();
  }

  ngOnDestroy(): void {
    this.untilLogin$.next();
    this.untilLogout$.next();
  }

  /**
   * Element Event 처리
   *
   * @memberof TopSnsComponent
   */
  elEvt(): void {
    fromEvent(this.facebookEl?.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        window.open(
          'https://www.facebook.com/baron_dive-108418530678459/',
          'blank'
        );
      });

    fromEvent(this.instagramEl?.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        window.open('https://www.instagram.com/baron_dive/', 'blank');
      });

    fromEvent(this.mypageEl?.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.router.navigate(['/mypage']);
      });
  }
}
