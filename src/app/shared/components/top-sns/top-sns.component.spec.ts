/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { By, DomSanitizer } from '@angular/platform-browser';

import { regSvgIconProvider } from '@app/shared/providers';
import { RegSvgIconService } from '@app/shared/services';
import { SharedModule } from '@app/shared/shared.module';

import { TopSnsComponent } from './top-sns.component';

describe('TopSnsComponent', () => {
  let component: TopSnsComponent;
  let fixture: ComponentFixture<TopSnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientModule],
      declarations: [TopSnsComponent],
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: regSvgIconProvider,
          deps: [RegSvgIconService, MatIconRegistry, DomSanitizer],
          multi: true,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('TopSnsComponent 생성 ...', () => {
    expect(component).toBeTruthy();
  });

  it('Click Event 체크 ...', () => {
    fixture.detectChanges();
    const buttonEl = fixture.debugElement.queryAll(By.css('.icon-btn'));

    expect(buttonEl.length).toBe(4);
  });
});
