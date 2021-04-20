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

import { fromEvent, Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { MemberService } from '@app/shared/api';
import { FindPwdParam } from '@app/shared/interfaces';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-pwd-find',
  templateUrl: './pwd-find.component.html',
  styleUrls: ['./pwd-find.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PwdFindComponent implements OnInit, AfterViewInit {
  public submitGroup!: FormGroup;

  @ViewChild('closeEl', { read: ElementRef })
  private closeEl!: ElementRef;

  @ViewChild('idInputEl', { read: ElementRef })
  private idInputEl!: ElementRef;

  @ViewChild('emailInputEl', { read: ElementRef })
  private emailInputEl!: ElementRef;

  @ViewChild('submitEl', { read: ElementRef })
  private submitEl!: ElementRef;

  private untilFindPwd$: Subject<void> = new Subject<void>();

  constructor(
    private dlRef: MatDialogRef<PwdFindComponent>,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private memberServ: MemberService
  ) {}

  ngOnInit(): void {
    this.submitGroup = this.formBuilder.group({
      loginid: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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
        this.findPwdApi();
      });

    fromEvent(this.idInputEl.nativeElement, 'keydown')
      .pipe(
        debounceTime(150),
        filter((e: unknown) => {
          const ev: KeyboardEvent = e as KeyboardEvent;
          return ev.key === 'Enter';
        }),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.findPwdApi();
      });

    fromEvent(this.emailInputEl.nativeElement, 'keydown')
      .pipe(
        debounceTime(150),
        filter((e: unknown) => {
          const ev: KeyboardEvent = e as KeyboardEvent;
          return ev.key === 'Enter';
        }),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.findPwdApi();
      });
  }

  findPwdApi(): void {
    this.memberServ
      .getFindPwd(this.submitGroup.value as FindPwdParam)
      .pipe(untilDestroyed(this), takeUntil(this.untilFindPwd$))
      .subscribe((res) => {
        if (res) {
          alert('등록된 이메일로 임시 비밀번호가 발송 되었습니다.');
          this.dlRef.close();
        } else {
          alert(
            '입력된 정보와 일치하는 계정이 없습니다.\n다시 확인하시기 바랍니다.'
          );
          this.cdRef.detectChanges();
        }
      });
  }

  getFormCtrl(key: string): AbstractControl {
    return this.submitGroup.controls[key];
  }
}
