/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By, DomSanitizer } from '@angular/platform-browser';
import { ApplicationInitStatus, APP_INITIALIZER } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';

import { SharedModule } from '@app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import {
  appConfigFactory,
  AppConfigProvider,
  regSvgIconProvider,
} from '@app/shared/providers';
import { AppConfigService, RegSvgIconService } from '@app/shared/services';

import { NavService } from '@app/shared/api';
import { TopGnbComponent } from './top-gnb.component';

describe('TopGnbComponent', () => {
  let component: TopGnbComponent;
  let fixture: ComponentFixture<TopGnbComponent>;
  let service: NavService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientModule, RouterTestingModule],
      declarations: [TopGnbComponent],
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: appConfigFactory,
          deps: [AppConfigService, HttpClientModule],
          multi: true,
        },
        AppConfigProvider,
        {
          provide: APP_INITIALIZER,
          useFactory: regSvgIconProvider,
          deps: [RegSvgIconService, MatIconRegistry, DomSanitizer],
          multi: true,
        },
      ],
    }).compileComponents();

    await TestBed.inject(ApplicationInitStatus).donePromise;
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(TopGnbComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(NavService);

    component.navList = await service
      .getNav({
        sgrp: 'SS0',
        useyn: 'Y',
      })
      .toPromise();
    fixture.detectChanges();
  });

  it('TopGnbComponent 생성 ...', () => {
    expect(component).toBeTruthy();
  });

  it('NAV Element, DB 갯수 체크 ...', () => {
    fixture.detectChanges();
    const buttonEl = fixture.debugElement.queryAll(By.css('.nav-items a'));
    fixture.detectChanges();

    expect(component.navList.length).toBe(buttonEl.length);
  });
});
