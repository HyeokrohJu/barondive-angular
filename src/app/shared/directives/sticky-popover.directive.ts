import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injector,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { NgbPopover, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

/**
 * Sticky Popover Directive
 *
 * @export
 * @class StickyPopoverDirective
 * @extends {NgbPopover}
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Directive({
  selector: '[appStickyPopover]',
  exportAs: 'stickyPopover',
})
export class StickyPopoverDirective
  extends NgbPopover
  implements OnInit, OnDestroy {
  @Input()
  public appStickyPopover: TemplateRef<any> | string | undefined;

  public popoverTitle: string | undefined;

  @Input()
  public placement:
    | 'auto'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'left-top'
    | 'left-bottom'
    | 'right-top'
    | 'right-bottom'
    | (
        | 'auto'
        | 'top'
        | 'bottom'
        | 'left'
        | 'right'
        | 'top-left'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-right'
        | 'left-top'
        | 'left-bottom'
        | 'right-top'
        | 'right-bottom'
      )[] = 'auto';

  public triggers: string;

  public container: string;

  public shown: EventEmitter<void> = new EventEmitter<void>();

  public hidden: EventEmitter<void> = new EventEmitter<void>();

  public ngbPopover: TemplateRef<any> | string | undefined;

  public canClosePopover: boolean | undefined;

  @Output()
  public copyShowChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _copyShow: boolean | undefined;

  @Input()
  get copyShow(): boolean {
    return !!this._copyShow;
  }

  set copyShow(value: boolean) {
    this._copyShow = value;
    this.copyShowChange.emit(this._copyShow);
  }

  @Input()
  public isShow = true;

  private until$: Subject<void> = new Subject<void>();

  constructor(
    private _elRef: ElementRef,
    private _render: Renderer2,
    injector: Injector,
    componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    config: NgbPopoverConfig,
    ngZone: NgZone,
    @Inject(DOCUMENT) _document: any,
    _changeDetector: ChangeDetectorRef,
    applicationRef: ApplicationRef
  ) {
    super(
      _elRef,
      _render,
      injector,
      componentFactoryResolver,
      viewContainerRef,
      config,
      ngZone,
      _document,
      _changeDetector,
      applicationRef
    );

    this.triggers = 'manual';
    this.container = 'body';
    this.autoClose = false;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.ngbPopover = this.appStickyPopover;

    fromEvent(this._elRef.nativeElement, 'mouseenter')
      .pipe(takeUntil(this.until$))
      .subscribe(() => {
        if (this.isShow) {
          this.canClosePopover = true;
          this.open();
        }
      });

    fromEvent(this._elRef.nativeElement, 'click')
      .pipe(takeUntil(this.until$))
      .subscribe(() => {
        this.close();
      });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.until$.next();
    this.until$.complete();
  }

  toggle(): void {
    super.toggle();
  }

  isOpen(): boolean {
    return super.isOpen();
  }

  open(): void {
    this.copyShow = false;
    super.open();
    const popover = window.document.querySelector('.popover');
    if (popover) {
      fromEvent(popover, 'mouseover')
        .pipe(takeUntil(this.until$))
        .subscribe(() => {
          this.canClosePopover = false;
        });
    }

    const body = window.document.getElementsByTagName('body');
    if (body[0]) {
      fromEvent(body[0], 'mouseover')
        .pipe(takeUntil(this.until$))
        .subscribe((event: any) => {
          this.popoverClose(event as MouseEvent);
        });
    }
  }

  popoverClose(event: MouseEvent): void {
    const popover = window.document.querySelector('.popover');
    const target = event.target as Element;
    if (
      !(
        target.closest('.popover') ||
        target
          .closest('[aria-describedby]')
          ?.getAttribute('aria-describedby') === popover?.getAttribute('id')
      )
    ) {
      this.close();
    }
  }

  close(): void {
    this.copyShow = false;
    super.close();
  }
}
