import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClientJsonpModule,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { MatIconRegistry } from '@angular/material/icon';
import { SharedModule } from './shared/shared.module';
import {
  appConfigFactory,
  AppConfigProvider,
  OverrideConsole,
  regSvgIconProvider,
} from './shared/providers';
import { AppConfigService, RegSvgIconService } from './shared/services';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesComponent } from './views/pages/pages.component';
import {
  CancelInterceptorService,
  ErrorInterceptorService,
  TokenInterceptorService,
} from './shared/interceptors';
import { AnyComponent } from './views/any/any.component';
import { ErrorComponent } from './views/error/error.component';

/**
 * APP 모듈
 *
 * @export
 * @class AppModule
 */
@NgModule({
  declarations: [AppComponent, PagesComponent, AnyComponent, ErrorComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: OverrideConsole,
      deps: [],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: regSvgIconProvider,
      deps: [RegSvgIconService, MatIconRegistry, DomSanitizer],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigFactory,
      deps: [AppConfigService, HttpClientModule],
      multi: true,
    },
    AppConfigProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CancelInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
