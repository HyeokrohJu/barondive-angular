import { fromEvent, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import * as _ from 'lodash';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StickyPositions } from '@w11k/angular-sticky-things';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { NavList } from '@app/shared/interfaces';
import { NavService } from '@app/shared/api';

/**
 * 상단 GNB Component
 *
 * @export
 * @class TopGnbComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
 */
@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-top-gnb',
  templateUrl: './top-gnb.component.html',
  styleUrls: ['./top-gnb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopGnbComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * RxJS Event Cancel Observable
   *
   * @private
   * @type {Subject<void>}
   * @memberof TopGnbComponent
   */
  private until$: Subject<void> = new Subject<void>();

  /**
   * NAV Elements
   *
   * @private
   * @type {(QueryList<ElementRef> | undefined)}
   * @memberof TopGnbComponent
   */
  @ViewChildren('navEl')
  private navEls: QueryList<ElementRef> | undefined;

  /**
   * Main Link Element
   *
   * @private
   * @type {(QueryList<ElementRef> | undefined)}
   * @memberof TopGnbComponent
   */
  @ViewChildren('mainLinkEl')
  private mainLinkELs: QueryList<ElementRef> | undefined;

  /**
   * Scroll Sticky 여부
   *
   * @type {(boolean | undefined)}
   * @memberof TopGnbComponent
   */
  public isGnbSmall: boolean | undefined;

  /**
   * 선택된 GNB
   *
   * @type {(string | undefined)}
   * @memberof TopGnbComponent
   */
  public currentNav: string | undefined;

  /**
   * Nav List
   *
   * @type {NavList[]}
   * @memberof TopGnbComponent
   */
  public navList: NavList[] = [];

  public get isMobile(): boolean {
    return window.innerWidth < 757;
  }

  private untilMobileMenu$: Subject<void> = new Subject<void>();

  private untilMobileClose$: Subject<void> = new Subject<void>();

  public isMenuOpen: boolean | undefined;

  @ViewChild('mobileMenuEl')
  private set mobileMenuEl(el: ElementRef) {
    if (el) {
      this.untilMobileMenu$.next();
      fromEvent(el.nativeElement, 'click')
        .pipe(untilDestroyed(this), takeUntil(this.untilMobileMenu$))
        .subscribe(() => {
          this.isMenuOpen = !this.isMenuOpen;

          this.cdRef.detectChanges();
        });
    }
  }

  @ViewChildren('mobileCloseEl')
  private set mobileCloseEl(els: QueryList<ElementRef>) {
    this.untilMobileClose$.next();
    els.forEach((el) => {
      fromEvent(el.nativeElement, 'click')
        .pipe(untilDestroyed(this), takeUntil(this.untilMobileMenu$))
        .subscribe(() => {
          this.isMenuOpen = false;

          this.cdRef.detectChanges();
        });
    });
  }

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private navServ: NavService
  ) {}

  ngOnInit(): void {
    this.apiCall();
    this.initRouter();
  }

  ngAfterViewInit(): void {
    this.navElEv();
  }

  ngOnDestroy(): void {
    this.untilMobileMenu$.next();
    this.untilMobileClose$.next();
  }

  /**
   * API Call
   *
   * @memberof TopGnbComponent
   */
  apiCall(): void {
    const currtUrl = _.split(this.router.url, '/');
    this.navServ
      .getNav({
        sgrp: 'SS0',
        useyn: 'Y',
      })
      .pipe(
        untilDestroyed(this),
        tap((data: NavList[]) => {
          _.forEach(data, (nav: NavList) => {
            if (nav.upath === `/${currtUrl[1]}`) {
              this.currentNav = nav.menucd;
            }
          });
        })
      )
      .subscribe((data: NavList[]) => {
        this.navList = data;

        this.cdRef.detectChanges();
        this.navElEv();
      });
  }

  initRouter(): void {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        untilDestroyed(this)
      )
      .subscribe((event: NavigationEnd) => {
        const currtUrl = _.split(event.urlAfterRedirects, '/');
        const currtNav: NavList | undefined = _.find(this.navList, {
          upath: `/${currtUrl[1]}`,
        }) as NavList;
        this.currentNav = currtNav?.menucd;

        this.cdRef.detectChanges();
      });
  }

  /**
   * NAV click Event
   *
   * @memberof TopGnbComponent
   */
  navElEv(): void {
    this.until$.next();
    this.navEls?.forEach((navEl) => {
      fromEvent(navEl.nativeElement, 'click')
        .pipe(
          untilDestroyed(this),
          takeUntil(this.until$),
          map((ev) => {
            const target = (ev as MouseEvent).target as HTMLElement;
            return {
              htmlEl: target,
              navItem: this.navList[Number(target.getAttribute('idx'))],
            };
          })
        )
        .subscribe((ev: { htmlEl: HTMLElement; navItem: NavList }) => {
          this.currentNavEv(ev.navItem);
          this.isMenuOpen = false;

          this.cdRef.detectChanges();
        });
    });

    this.mainLinkELs?.forEach((mainLinkE) => {
      fromEvent(mainLinkE?.nativeElement, 'click')
        .pipe(untilDestroyed(this), takeUntil(this.until$))
        .subscribe(() => {
          this.isGnbSmall = false;
          this.currentNav = undefined;
          this.isMenuOpen = false;

          this.router.navigate(['/']);
          this.cdRef.detectChanges();
        });
    });
  }

  /**
   * Scroll Sticky 변경 이벤트
   *
   * @param {StickyPositions} pos
   * @memberof TopGnbComponent
   */
  chnageStickyPos(pos: StickyPositions): void {
    if (_.isNumber(pos.upperScreenEdgeAt)) {
      if (pos.upperScreenEdgeAt > 0) {
        if (!this.isGnbSmall) {
          this.isGnbSmall = true;
          this.cdRef.detectChanges();
          this.navElEv();
        }
        this.isGnbSmall = true;
      } else {
        if (this.isGnbSmall) {
          this.isGnbSmall = false;
          this.cdRef.detectChanges();
          this.navElEv();
        }
        this.isGnbSmall = false;
      }
    } else if (pos.offsetY === 0) {
      if (!this.isGnbSmall) {
        this.isGnbSmall = true;
        this.cdRef.detectChanges();
        this.navElEv();
      }
      this.isGnbSmall = true;
    } else {
      if (this.isGnbSmall) {
        this.isGnbSmall = false;
        this.cdRef.detectChanges();
        this.navElEv();
      }
      this.isGnbSmall = false;
    }
  }

  /**
   * GNB 선택 이벤트
   *
   * @param {string} navStr
   * @memberof TopGnbComponent
   */
  currentNavEv(navItem: NavList): void {
    this.router.navigate([navItem.upath]);
  }

  /**
   * Sub GNB 선택 이벤트
   *
   * @param {NavList} pNav
   * @param {NavList} subNav
   * @memberof TopGnbComponent
   */
  clkSubNav(pNav: NavList, subNav: NavList): void {
    this.router.navigate([subNav.upath]);
  }
}
