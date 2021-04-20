import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MypageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('tabMenuEl')
  private tabMenuEls: QueryList<ElementRef> | undefined;

  public stickyStatus: boolean;

  constructor(private cdRef: ChangeDetectorRef, public router: Router) {
    this.stickyStatus = false;
  }

  ngOnInit(): void {
    this.stickyStatus = false;
  }

  ngAfterViewInit(): void {
    this.tabElEv();
  }

  ngOnDestroy(): void {
    this.stickyStatus = false;
    this.cdRef.detectChanges();
  }

  /**
   * Tab 이벤트 처리
   *
   * @memberof IntroComponent
   */
  tabElEv(): void {
    this.tabMenuEls?.forEach((tabEl) => {
      fromEvent(tabEl.nativeElement, 'click')
        .pipe(
          untilDestroyed(this),
          map((ev) => {
            const target = (ev as MouseEvent).target as HTMLElement;
            return {
              htmlEl: target,
              path: target.getAttribute('path') as string,
            };
          })
        )
        .subscribe(({ path }) => {
          this.router.navigate([path]);
        });
    });
  }
}
