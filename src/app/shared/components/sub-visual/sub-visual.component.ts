import { fromEvent } from 'rxjs';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

/**
 * Sub Visual Component
 *
 * @export
 * @class SubVisualComponent
 * @implements {AfterViewInit}
 */
@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-sub-visual',
  templateUrl: './sub-visual.component.html',
  styleUrls: ['./sub-visual.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubVisualComponent implements AfterViewInit {
  @ViewChild('titleEl')
  public titleEl: ElementRef | undefined;

  public isActive: boolean;

  /**
   * 이미지 URL
   *
   * @type {string}
   * @memberof SubVisualComponent
   */
  private _imgUrl: string | undefined;

  @Input()
  public set imgUrl(url: string) {
    this.isActive = true;
    this._imgUrl = url;
  }

  public get imgUrl(): string {
    return this._imgUrl || '/assets/images/common/no_img.jpg';
  }

  @Input()
  public title: string;

  @Input()
  public theme: 'light' | 'dark' | undefined;

  constructor(private cdRef: ChangeDetectorRef) {
    this.title = '';
    this.isActive = false;
  }

  ngAfterViewInit(): void {
    fromEvent(this.titleEl?.nativeElement, 'animationend')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.isActive = false;

        this.cdRef.detectChanges();
      });
  }
}
