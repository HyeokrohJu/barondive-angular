import { fromEvent, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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

import { OauthUtils, ValidatorUtils } from '@app/shared/utils';
import { MemberInfo } from '@app/shared/interfaces';
import { MemberService } from '@app/shared/api';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserinfoComponent implements OnInit, AfterViewInit {
  @ViewChild('editBtnEl', { read: ElementRef })
  private editBtnEl!: ElementRef;

  @ViewChildren('inputEl', { read: ElementRef })
  private idInputEls!: QueryList<ElementRef>;

  @ViewChild('baronTitEl')
  private baronTitEl!: ElementRef;

  public submitGroup!: FormGroup;

  private userInfo!: MemberInfo;

  private untilUserInfo$: Subject<void> = new Subject<void>();

  private untilUserUpd$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private memServ: MemberService
  ) {}

  ngOnInit(): void {
    this.submitGroup = this.formBuilder.group({
      loginid: [
        { value: '', disabled: true },
        [Validators.required],
        ValidatorUtils.isMemberDiff(this.memServ),
      ],
      passwd: ['', [Validators.required, ValidatorUtils.password]],
      usernm: ['', [Validators.required]],
      sex: ['M', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mphone: ['', [Validators.required, ValidatorUtils.mphone]],
    });

    this.apiCallInit();
  }

  ngAfterViewInit(): void {
    fromEvent(this.editBtnEl.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.editSubmit();
      });

    fromEvent(this.baronTitEl.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.router.navigate(['/main']);
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
          this.editSubmit();
        });
    });
  }

  apiCallInit(): void {
    const userid: string = OauthUtils.isToken()
      ? OauthUtils.getAccessToken().userInfo?.userid || ''
      : '';
    this.memServ
      .getMemberInfo({ userid })
      .pipe(untilDestroyed(this), takeUntil(this.untilUserInfo$))
      .subscribe((userInfo: MemberInfo) => {
        this.userInfo = userInfo;

        this.submitGroup = this.formBuilder.group({
          loginid: [
            { value: userInfo.loginid, disabled: true },
            [Validators.required],
            ValidatorUtils.isMemberDiff(this.memServ),
          ],
          passwd: ['', [ValidatorUtils.password]],
          usernm: [userInfo.usernm, [Validators.required]],
          sex: [userInfo.sex, [Validators.required]],
          email: [userInfo.email, [Validators.required, Validators.email]],
          mphone: [
            userInfo.mphone,
            [Validators.required, ValidatorUtils.mphone],
          ],
        });

        this.cdRef.detectChanges();
      });
  }

  editSubmit(): void {
    if (this.submitGroup.invalid) {
      return;
    }

    const fVal = this.submitGroup.value;

    this.userInfo = {
      ...this.userInfo,
      ...fVal,
    } as MemberInfo;

    this.memServ
      .updateMember(this.userInfo)
      .pipe(untilDestroyed(this), takeUntil(this.untilUserUpd$))
      .subscribe(() => {
        alert('회원정보 수정이 정상 처리 되었습니다.');

        this.apiCallInit();
      });
  }

  getFormCtrl(key: string): AbstractControl {
    return this.submitGroup.controls[key];
  }
}
