import { ApplicationInitStatus, APP_INITIALIZER } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { AppConfigService } from './shared/services';
import { AppComponent } from './app.component';
import {
  appConfigFactory,
  AppConfigProvider,
} from './shared/providers/app-config-provider';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, SharedModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: appConfigFactory,
          deps: [AppConfigService, HttpClientModule],
          multi: true,
        },
        AppConfigProvider,
      ],
    }).compileComponents();

    await TestBed.inject(ApplicationInitStatus).donePromise;
  });

  it('App Component 생성 ...', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });
});
