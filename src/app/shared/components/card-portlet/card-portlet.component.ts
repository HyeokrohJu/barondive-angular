import { fromEvent } from 'rxjs';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { MOMENT_MIN_DATE } from '@app/shared/providers';
import { BltParam } from '@app/shared/interfaces';

/**
 * Card Portlet Component
 *
 * @export
 * @class CardPortletComponent
 */
@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-card-portlet',
  templateUrl: './card-portlet.component.html',
  styleUrls: ['./card-portlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPortletComponent implements AfterViewInit {
  /**
   * 가로 사이즈
   *
   * @type {string}
   * @memberof CardPortletComponent
   */
  @Input()
  public width: string;

  /**
   * 세로 사이즈
   *
   * @type {string}
   * @memberof CardPortletComponent
   */
  @Input()
  public height: string;

  /**
   * 이미지 URL
   *
   * @type {string}
   * @memberof CardPortletComponent
   */
  private _imgUrl!: string;

  @Input()
  public set imgUrl(url: string) {
    this._imgUrl = url;
  }

  public get imgUrl(): string {
    return this._imgUrl || '/assets/images/common/no_img.jpg';
  }

  /**
   * 제목
   *
   * @type {(string | undefined)}
   * @memberof CardPortletComponent
   */
  @Input()
  public title: string | undefined;

  /**
   * 등록자
   *
   * @type {(string | undefined)}
   * @memberof CardPortletComponent
   */
  @Input()
  public writer: string | undefined;

  /**
   * 등록 일시
   *
   * @type {(string | number | undefined)}
   * @memberof CardPortletComponent
   */
  @Input()
  public dateTime: string | number | undefined;

  @Input()
  public brdid: string | undefined;

  @Input()
  public bltid: number | undefined;

  /**
   * 내용
   *
   * @type {(string | undefined)}
   * @memberof CardPortletComponent
   */
  @Input()
  public content: string | undefined;

  @Output()
  public clickEv: EventEmitter<BltParam> = new EventEmitter<BltParam>();

  @ViewChild('cardWrapEl')
  private cardWrapEl!: ElementRef;

  constructor(@Inject(MOMENT_MIN_DATE) public momentMinDate: string) {
    this.width = '100%';
    this.height = '200px';
  }

  ngAfterViewInit(): void {
    fromEvent(this.cardWrapEl.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.clickEv.emit({
          brdid: this.brdid as string,
          bltid: this.bltid as number,
        });
      });
  }
}
