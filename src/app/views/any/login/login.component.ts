import { fromEvent } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import * as _ from 'lodash';

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
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CommonUtils, OauthUtils } from '@app/shared/utils';
import { Oauth2Service } from '@app/shared/services';
import { LoginParams } from '@app/shared/interfaces';
import { IdFindComponent, PwdFindComponent } from '@app/shared/components';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, AfterViewInit {
  private qParams: Params | undefined;

  @ViewChild('loginBtnEl', { read: ElementRef })
  private set loginBtnEl(el: ElementRef) {
    fromEvent(el.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.loginSubmit();
      });
  }

  @ViewChild('idInputEl', { read: ElementRef })
  private idInputEl!: ElementRef;

  @ViewChild('pwInputEl', { read: ElementRef })
  private pwInputEl!: ElementRef;

  @ViewChildren('baronTitEl')
  private baronTitEl!: QueryList<ElementRef>;

  @ViewChild('idFindEl')
  private idFindEl!: ElementRef;

  @ViewChild('pwdFindEl')
  private pwdFindEl!: ElementRef;

  @ViewChild('signupEl')
  private signupEl!: ElementRef;

  public submitGroup!: FormGroup;

  constructor(
    private router: Router,
    private acRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private oAuthServ: Oauth2Service
  ) {}

  ngOnInit(): void {
    this.qParams = this.acRouter.snapshot.queryParams;
    const saveIdStr = OauthUtils.getLocStorage('_ID_SAVE_') || '';
    this.submitGroup = this.formBuilder.group({
      username: [saveIdStr, [Validators.required]],
      password: ['', [Validators.required]],
      idSave: [!!saveIdStr],
    });
  }

  ngAfterViewInit(): void {
    this.baronTitEl.forEach((el) => {
      fromEvent(el.nativeElement, 'click')
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.router.navigate(['/main']);
        });
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
        this.loginSubmit();
      });

    fromEvent(this.pwInputEl.nativeElement, 'keydown')
      .pipe(
        debounceTime(150),
        filter((e: unknown) => {
          const ev: KeyboardEvent = e as KeyboardEvent;
          return ev.key === 'Enter';
        }),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.loginSubmit();
      });

    fromEvent(this.idFindEl.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.idFind();
      });

    fromEvent(this.pwdFindEl.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.pwdFind();
      });

    fromEvent(this.signupEl.nativeElement, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.router.navigate(['/any/signup']);
      });
  }

  loginSubmit(): void {
    if (this.submitGroup.invalid) {
      return;
    }

    const fVal = this.submitGroup.value;

    if (fVal.idSave) {
      OauthUtils.setLocStorage('_ID_SAVE_', fVal.username);
    } else {
      OauthUtils.removeLocStorage('_ID_SAVE_');
    }

    this.oAuthServ.getOAuth2Jwt(fVal as LoginParams).subscribe((data) => {
      if (data.access_token) {
        OauthUtils.addToken(data);
        if (this.qParams?.retUrl) {
          const uri = _.split(this.qParams.retUrl, '?')[0];
          const qStr = _.split(this.qParams.retUrl, '?')[1];
          if (qStr) {
            const params: any = CommonUtils.strToObj(qStr);
            this.router.navigate([uri], { queryParams: params });
          } else {
            this.router.navigate([uri]);
          }
        } else {
          this.router.navigate(['/main']);
        }
      } else {
        alert('아이디와 패스워드를 다시 확인하시기 바랍니다.');
        console.error('로그인 실패');
        this.submitGroup.reset();
      }
    });
  }

  idFind(): void {
    this.dialog.open(IdFindComponent, {
      disableClose: true,
    });
  }

  pwdFind(): void {
    this.dialog.open(PwdFindComponent, {
      disableClose: true,
    });
  }

  getFormCtrl(key: string): AbstractControl {
    return this.submitGroup.controls[key];
  }
}
