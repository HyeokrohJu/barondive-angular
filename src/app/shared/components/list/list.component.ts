import { fromEvent, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';

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
import { MatTableDataSource } from '@angular/material/table';

import { ListTable } from '@app/shared/interfaces';
import { MOMENT_FULL_DATE } from '@app/shared/providers';

/**
 * List Component
 *
 * @export
 * @class ListComponent
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnDestroy {
  @Output()
  public tbConfigChange: EventEmitter<ListTable> = new EventEmitter<ListTable>();

  @Output()
  public clickEv: EventEmitter<unknown> = new EventEmitter<unknown>();

  @ViewChildren('linkEl')
  private set linkEls(els: QueryList<ElementRef>) {
    if (els.length > 0) {
      this.until$.next();
      els.forEach((linkEl) => {
        fromEvent(linkEl.nativeElement, 'click')
          .pipe(
            takeUntil(this.until$),
            map(() => {
              const target = linkEl.nativeElement as HTMLElement;
              return {
                htmlEl: target,
                dataItem: this.tbDataSource.data[
                  Number(target.getAttribute('idx'))
                ],
              };
            })
          )
          .subscribe((ev: { htmlEl: HTMLElement; dataItem: unknown }) => {
            this.clickEv.emit(ev.dataItem);
          });
      });
    }
  }

  private until$: Subject<void> = new Subject<void>();

  private orgTbConfig!: ListTable | undefined;

  private _tbConfig!: ListTable;

  @Input()
  public get tbConfig(): ListTable {
    return this._tbConfig;
  }

  public set tbConfig(value: ListTable) {
    this._tbConfig = value;
    this.tbConfigChange.emit(value);

    if (!this.orgTbConfig) {
      this.orgTbConfig = _.cloneDeep(value);
    }
  }

  public tbDataSource!: MatTableDataSource<any>;

  private _tbData: any;

  @Input()
  public get tbData(): any {
    return this._tbData;
  }

  public set tbData(value: any) {
    this._tbData = value;
    this.tbDataSource = new MatTableDataSource<any>(value);
  }

  constructor(@Inject(MOMENT_FULL_DATE) public momentFullDate: string) {}

  ngOnDestroy(): void {
    this.until$.next();
  }
}
