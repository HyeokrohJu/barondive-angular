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
import { BltDesc } from '@app/shared/interfaces';

/**
 * Image List Component
 *
 * @export
 * @class ImgListComponent
 * @implements {AfterViewInit}
 */
@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-img-list',
  templateUrl: './img-list.component.html',
  styleUrls: ['./img-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgListComponent implements AfterViewInit {
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

  private _data!: BltDesc;

  @Input()
  public get data(): BltDesc {
    return this._data;
  }

  public set data(d: BltDesc) {
    const nwData = d;
    nwData.filethumb = nwData.filethumb || '/assets/images/common/no_img.jpg';
    this._data = nwData;
  }

  @ViewChild('clickBtnEl')
  private clickBtnEl: ElementRef | undefined;

  @Output()
  public clickEv: EventEmitter<BltDesc> = new EventEmitter<BltDesc>();

  constructor(@Inject(MOMENT_MIN_DATE) public momentMinDate: string) {
    this.width = '250px';
    this.height = '300px';
  }

  ngAfterViewInit(): void {
    fromEvent(this.clickBtnEl?.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.clickEv.emit(this.data);
      });
  }
}
