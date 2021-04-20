import 'hammerjs';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-console
  console.log(
    '%cBARONDIVE',
    `color: #4E8CC7; font-size: 60px; font-family: 'NanumSquare'; font-weight: 900;`
  );

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err));
});
