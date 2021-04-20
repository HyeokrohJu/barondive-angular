import * as _ from 'lodash';

import {
  AfterViewInit,
  Directive,
  EventEmitter,
  Host,
  Input,
  Optional,
  Output,
  Renderer2,
  Self,
  ViewContainerRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatButton } from '@angular/material/button';

import { PageItem, Paginator } from '../interfaces';

/**
 * Custom Paginator Directive
 *
 * @export
 * @class CustomPaginatorDirective
 * @implements {AfterViewInit}
 */
@Directive({
  selector: '[appCustomPaginator]',
})
export class CustomPaginatorDirective implements AfterViewInit {
  @Output()
  public pageSwitchEv: EventEmitter<PageItem> = new EventEmitter<PageItem>();

  private pageGapTxt = '...';

  private rangeStart!: number;

  private rangeEnd!: number;

  private buttons: MatButton[] = [];

  private curPageObj: Paginator = {
    length: 0,
    pageIndex: 0,
    pageSize: 0,
    previousPageIndex: 0,
  };

  private _showTotalPages: number;

  @Input()
  get showTotalPages(): number {
    return this._showTotalPages;
  }

  set showTotalPages(value: number) {
    this._showTotalPages = value % 2 === 0 ? value + 1 : value;
  }

  @Input()
  set length(value: number) {
    this.initPageRange();
  }

  @Input()
  set pageSize(value: number) {
    this.curPageObj.pageSize = value;
    this.curPageObj.pageIndex = 0;
    this.matPag.pageIndex = 0;
    this.initPageRange();
  }

  get inc(): number {
    return this._showTotalPages % 2 === 0
      ? this.showTotalPages / 2
      : (this.showTotalPages - 1) / 2;
  }

  get numOfPages(): number {
    return this.matPag.getNumberOfPages();
  }

  get lastPageIndex(): number {
    return this.matPag.getNumberOfPages() - 1;
  }

  constructor(
    @Host() @Self() @Optional() private readonly matPag: MatPaginator,
    private vr: ViewContainerRef,
    private ren: Renderer2
  ) {
    this._showTotalPages = 2;

    this.matPag.page.subscribe((e: Paginator) => {
      if (
        this.curPageObj.pageSize !== e.pageSize &&
        this.curPageObj.pageIndex !== 0
      ) {
        e.pageIndex = 0;
        this.rangeStart = 0;
        this.rangeEnd = this._showTotalPages - 1;
      }
      this.curPageObj = e;

      this.initPageRange();
    });
  }

  private initPageRange(): void {
    const middleIndex = (this.rangeStart + this.rangeEnd) / 2;

    this.rangeStart = this.calcRangeStart(middleIndex);
    this.rangeEnd = this.calcRangeEnd(middleIndex);

    const paginatorIcon = this.vr.element.nativeElement.querySelectorAll(
      '.mat-paginator-icon'
    );
    _.forEach(paginatorIcon, (node) => {
      this.ren.setStyle(node, 'width', '20px');
    });

    this.buildPageNumbers();
  }

  private calcRangeStart(middleIndex: number): number {
    switch (true) {
      case this.curPageObj.pageIndex === 0 && this.rangeStart !== 0: {
        return 0;
      }
      case this.curPageObj.pageIndex > this.rangeEnd: {
        return this.curPageObj.pageIndex + this.inc > this.lastPageIndex
          ? this.lastPageIndex - this.inc * 2
          : this.curPageObj.pageIndex - this.inc;
      }
      case this.curPageObj.pageIndex > this.curPageObj.previousPageIndex &&
        this.curPageObj.pageIndex > middleIndex &&
        this.rangeEnd < this.lastPageIndex: {
        return this.rangeStart + 1;
      }
      case this.curPageObj.pageIndex < this.curPageObj.previousPageIndex &&
        this.curPageObj.pageIndex < middleIndex &&
        this.rangeStart > 0: {
        return this.rangeStart - 1;
      }
      default: {
        return this.rangeStart;
      }
    }
  }

  private calcRangeEnd(middleIndex: number): number {
    switch (true) {
      case this.curPageObj.pageIndex === 0 &&
        this.rangeEnd !== this._showTotalPages: {
        return this._showTotalPages - 1;
      }
      case this.curPageObj.pageIndex > this.rangeEnd: {
        return this.curPageObj.pageIndex + this.inc > this.lastPageIndex
          ? this.lastPageIndex
          : this.curPageObj.pageIndex + 1;
      }
      case this.curPageObj.pageIndex > this.curPageObj.previousPageIndex &&
        this.curPageObj.pageIndex > middleIndex &&
        this.rangeEnd < this.lastPageIndex: {
        return this.rangeEnd + 1;
      }
      case this.curPageObj.pageIndex < this.curPageObj.previousPageIndex &&
        this.curPageObj.pageIndex < middleIndex &&
        this.rangeStart >= 0 &&
        this.rangeEnd > this._showTotalPages - 1: {
        return this.rangeEnd - 1;
      }
      default: {
        return this.rangeEnd;
      }
    }
  }

  private buildPageNumbers(): void {
    const actionContainer = this.vr.element.nativeElement.querySelector(
      'div.mat-paginator-range-actions'
    );
    const nextPageNode = this.vr.element.nativeElement.querySelector(
      'button.mat-paginator-navigation-next'
    );

    const pageInfoNode = this.vr.element.nativeElement.querySelector(
      '.mat-paginator-range-label'
    );
    this.ren.setStyle(pageInfoNode, 'display', 'none');

    if (this.buttons.length > 0) {
      this.buttons.forEach((button) => {
        this.ren.removeChild(actionContainer, button);
      });
      this.buttons.length = 0;
    }

    if (this.buttons.length === 0) {
      const nodeArray = this.vr.element.nativeElement.childNodes[0]
        .childNodes[0].childNodes[1].childNodes;
      setTimeout(() => {
        _.forEach(nodeArray, (node) => {
          if (node.nodeName === 'BUTTON') {
            this.ren.setStyle(node, 'width', '28px');
            this.ren.setStyle(node, 'height', '28px');
            this.ren.setStyle(node, 'line-height', '8px');
            if (node.innerHTML.length > 100 && node.disabled) {
              this.ren.setStyle(node, 'background-color', '#bdbdbd');
              this.ren.setStyle(node, 'color', '#fff');
              this.ren.setStyle(node, 'margin', '1px');
            } else if (node.innerHTML.length > 100 && !node.disabled) {
              this.ren.setStyle(node, 'background-color', '#4e8cc7');
              this.ren.setStyle(node, 'color', '#fff');
              this.ren.setStyle(node, 'margin', '1px');
            } else if (node.disabled) {
              if (!_.isNaN(_.parseInt(node.innerHTML))) {
                this.ren.setStyle(node, 'background-color', '#4e8cc7');
                this.ren.setStyle(node, 'color', '#fff');
              } else {
                this.ren.setStyle(node, 'background-color', '#bdbdbd');
                this.ren.setStyle(node, 'color', '#fff');
              }
            }
          }
        });
      });
    }

    _.forEach(_.range(this.numOfPages), (idx) => {
      if (idx >= this.rangeStart && idx <= this.rangeEnd) {
        this.ren.insertBefore(
          actionContainer,
          this.createButton(idx, this.matPag.pageIndex),
          nextPageNode
        );
      }

      if (idx === this.rangeEnd) {
        this.ren.insertBefore(
          actionContainer,
          this.createButton(this.pageGapTxt, this.rangeEnd),
          nextPageNode
        );
      }
    });
  }

  private createButton(i: number | string, pageIndex: number): any {
    const linkBtn: MatButton = this.ren.createElement('button');
    this.ren.addClass(linkBtn, 'mat-mini-fab');
    this.ren.setStyle(linkBtn, 'margin', '2px');
    this.ren.setStyle(linkBtn, 'background-color', '#fff');
    this.ren.setStyle(linkBtn, 'width', '28px');
    this.ren.setStyle(linkBtn, 'height', '28px');
    this.ren.setStyle(linkBtn, 'line-height', '24px');

    const pagingTxt = _.isNaN(i) ? this.pageGapTxt : +(Number(i) + 1);
    const text = this.ren.createText(`${pagingTxt}`);

    this.ren.addClass(linkBtn, 'mat-custom-page');
    switch (i) {
      case pageIndex: {
        this.ren.setAttribute(linkBtn, 'disabled', 'disabled');
        break;
      }
      case this.pageGapTxt: {
        let newIndex = this.curPageObj.pageIndex + this._showTotalPages;

        if (newIndex >= this.numOfPages) {
          newIndex = this.lastPageIndex;
        }

        if (pageIndex !== this.lastPageIndex) {
          this.ren.listen(linkBtn, 'click', () => {
            this.switchPage(newIndex);
          });
        }

        if (pageIndex === this.lastPageIndex) {
          this.ren.setAttribute(linkBtn, 'disabled', 'disabled');
          this.ren.setStyle(linkBtn, 'display', 'none');
        }
        break;
      }
      default:
        this.ren.listen(linkBtn, 'click', () => {
          this.switchPage(i as number);
        });
        break;
    }

    this.ren.appendChild(linkBtn, text);
    this.buttons.push(linkBtn);
    return linkBtn;
  }

  private switchPage(i: number): void {
    const previousPageIndex = this.matPag.pageIndex;
    this.matPag.pageIndex = i;
    this.pageSwitchEv.emit({
      previousPageIndex,
      pageIndex: this.matPag.pageIndex,
      pageSize: this.matPag.pageSize,
      length: this.matPag.length,
    });

    this.initPageRange();
  }

  public ngAfterViewInit(): void {
    this.rangeStart = 0;
    this.rangeEnd = this._showTotalPages - 1;
    this.initPageRange();
  }
}
