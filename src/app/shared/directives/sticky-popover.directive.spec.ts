/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import {
  ApplicationInitStatus,
  APP_INITIALIZER,
  DebugElement,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NavService } from '../api';
import { TopGnbComponent } from '../components';
import { appConfigFactory, AppConfigProvider } from '../providers';
import { AppConfigService } from '../services';
import { SharedModule } from '../shared.module';
import { StickyPopoverDirective } from './sticky-popover.directive';

describe('Directive: StickyPopover', () => {
  let fixture: ComponentFixture<TopGnbComponent>;
  let des: DebugElement;
  let service: NavService;
  let component: TopGnbComponent;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, SharedModule],
      declarations: [StickyPopoverDirective, TopGnbComponent],
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: appConfigFactory,
          deps: [AppConfigService, HttpClientModule],
          multi: true,
        },
        AppConfigProvider,
        {
          provide: NavService,
          useClass: NavService,
        },
      ],
    });

    await TestBed.inject(ApplicationInitStatus).donePromise;

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

    des = fixture.debugElement.query(By.directive(StickyPopoverDirective));
  });

  it('sticky popup open ...', () => {
    fixture.detectChanges();

    const evt = document.createEvent('Event');
    evt.initEvent('mouseenter', true, false);
    des.nativeElement.dispatchEvent(evt);
    fixture.detectChanges();

    expect(des.nativeElement.getAttribute('aria-describedby')).not.toBeNull();
  });
});
