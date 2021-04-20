import { fromEvent } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ValidatorUtils } from '@app/shared/utils';
import { ApiMemberRoot, InsJoinParam } from '@app/shared/interfaces';
import { MemberService } from '@app/shared/api';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit, AfterViewInit {
  @ViewChild('signupBtnEl', { read: ElementRef })
  private signupBtnEl!: ElementRef;

  @ViewChildren('inputEl', { read: ElementRef })
  private idInputEls!: QueryList<ElementRef>;

  @ViewChildren('baronTitEl')
  private baronTitEl!: QueryList<ElementRef>;

  public submitGroup!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private memServ: MemberService
  ) {}

  ngOnInit(): void {
    this.submitGroup = this.formBuilder.group({
      loginid: [
        '',
        [Validators.required],
        ValidatorUtils.isMemberDiff(this.memServ),
      ],
      passwd: ['', [Validators.required, ValidatorUtils.password]],
      usernm: ['', [Validators.required]],
      sex: ['M', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mphone: ['', [Validators.required, ValidatorUtils.mphone]],
      useyn: 'Y',
      roleid: '2',
      state: 'I',
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.signupBtnEl.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.signupSubmit();
      });

    this.baronTitEl.forEach((el) => {
      fromEvent(el.nativeElement, 'click')
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.router.navigate(['/main']);
        });
    });

    this.idInputEls.forEach((el) => {
      fromEvent(el.nativeElement, 'keydown')
        .pipe(
          debounceTime(150),
          filter((e: unknown) => {
            const ev: KeyboardEvent = e as KeyboardEvent;
            return ev.key === 'Enter';
          }),
          untilDestroyed(this)
        )
        .subscribe(() => {
          this.signupSubmit();
        });
    });
  }

  signupSubmit(): void {
    if (this.submitGroup.invalid) {
      return;
    }

    const fVal = this.submitGroup.value;

    this.memServ
      .insertMember(fVal as InsJoinParam)
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        if ((data.resMap as ApiMemberRoot).userid) {
          alert('회원가입이 정상 처리 되었습니다.');

          this.router.navigate(['/any/login']);
        }
      });
  }

  getFormCtrl(key: string): AbstractControl {
    return this.submitGroup.controls[key];
  }
}
