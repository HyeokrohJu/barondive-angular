import { fromEvent, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { MOMENT_MIN_DATE } from '@app/shared/providers';

import { BltParam } from '@app/shared/interfaces';
import { ListPortletData } from './interface';

/**
 * List Portlet Component
 *
 * @export
 * @class ListPortletComponent
 */
@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-list-portlet',
  templateUrl: './list-portlet.component.html',
  styleUrls: ['./list-portlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPortletComponent implements OnDestroy {
  /**
   * 가로 사이즈
   *
   * @type {string}
   * @memberof ListPortletComponent
   */
  @Input()
  public width: string;

  /**
   * 세로 사이즈
   *
   * @type {string}
   * @memberof ListPortletComponent
   */
  @Input()
  public height: string;

  /**
   * 리스트 데이터
   *
   * @type {ListPortletData[]}
   * @memberof ListPortletComponent
   */
  @Input()
  public dataList: ListPortletData[] = [] as ListPortletData[];

  private untilList$: Subject<void> = new Subject<void>();

  @Output()
  private clickEv: EventEmitter<BltParam> = new EventEmitter<BltParam>();

  @ViewChildren('listEl')
  private set listEls(els: QueryList<ElementRef>) {
    this.untilList$.next();
    els.forEach((el) => {
      fromEvent(el.nativeElement, 'click')
        .pipe(
          untilDestroyed(this),
          takeUntil(this.untilList$),
          map((ev) => {
            const target = (ev as MouseEvent).target as HTMLElement;
            return {
              htmlEl: target,
              dataItem: this.dataList[Number(target.getAttribute('idx'))],
            };
          })
        )
        .subscribe(({ dataItem }) => {
          this.clickEv.emit(dataItem as BltParam);
        });
    });
  }

  constructor(@Inject(MOMENT_MIN_DATE) public momentMinDate: string) {
    this.width = '100%';
    this.height = '400px';
  }

  ngOnDestroy(): void {
    this.untilList$.next();
  }
}
