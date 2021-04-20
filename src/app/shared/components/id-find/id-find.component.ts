import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ValidatorUtils } from '@app/shared/utils';
import { fromEvent, Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { MemberService } from '@app/shared/api';
import { FindIdParam, IdFindRes } from '@app/shared/interfaces';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-id-find',
  templateUrl: './id-find.component.html',
  styleUrls: ['./id-find.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdFindComponent implements OnInit, AfterViewInit {
  public inputTit!: string;

  public submitGroup!: FormGroup;

  public findId: IdFindRes[] = [] as IdFindRes[];

  @ViewChild('closeEl', { read: ElementRef })
  private closeEl!: ElementRef;

  @ViewChild('findInputEl', { read: ElementRef })
  private findInputEl!: ElementRef;

  @ViewChild('submitEl', { read: ElementRef })
  private submitEl!: ElementRef;

  private untilFindId$: Subject<void> = new Subject<void>();

  public isSearch: boolean | undefined;

  constructor(
    private dlRef: MatDialogRef<IdFindComponent>,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private memberServ: MemberService
  ) {
    this.inputTit = '이메일';
  }

  ngOnInit(): void {
    this.submitGroup = this.formBuilder.group({
      type: ['email'],
      val: ['', [Validators.required, Validators.email]],
    });

    this.getFormCtrl('type')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((val) => {
        this.radioChg(val);
      });
  }

  ngAfterViewInit(): void {
    fromEvent(this.closeEl.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.dlRef.close();
      });

    fromEvent(this.submitEl.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.findIdApi();
      });

    fromEvent(this.findInputEl.nativeElement, 'keydown')
      .pipe(
        debounceTime(150),
        filter((e: unknown) => {
          const ev: KeyboardEvent = e as KeyboardEvent;
          return ev.key === 'Enter';
        }),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.findIdApi();
      });
  }

  findIdApi(): void {
    this.memberServ
      .getFindId(this.submitGroup.value as FindIdParam)
      .pipe(untilDestroyed(this), takeUntil(this.untilFindId$))
      .subscribe((res) => {
        this.findId = res;
        this.isSearch = true;

        this.cdRef.detectChanges();
      });
  }

  getFormCtrl(key: string): AbstractControl {
    return this.submitGroup.controls[key];
  }

  radioChg(item: string): void {
    switch (item) {
      case 'mphone': {
        this.inputTit = '휴대전화';
        this.getFormCtrl('val').setValidators([
          Validators.required,
          ValidatorUtils.mphone,
        ]);
        this.getFormCtrl('val').updateValueAndValidity();

        break;
      }
      default: {
        this.inputTit = '이메일';
        this.getFormCtrl('val').setValidators([
          Validators.required,
          Validators.email,
        ]);
        this.getFormCtrl('val').updateValueAndValidity();
        break;
      }
    }
  }
}
