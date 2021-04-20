import { fromEvent } from 'rxjs';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent implements AfterViewInit {
  @ViewChild('homeBtnEl', { read: ElementRef })
  private homeBtnEl!: ElementRef;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    fromEvent(this.homeBtnEl.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.router.navigate(['/main']);
      });
  }
}
