import { InjectionToken } from '@angular/core';

import { AppConfig } from '@app/shared/interfaces';
import { AppConfigService } from '@app/shared/services/app-config.service';

/**
 * APP Config Factory Provide
 *
 * @export
 * @param {AppConfigService} appConfigSev
 * @return {*}  {() => Promise<AppConfig>}
 */
export function appConfigFactory(
  appConfigSev: AppConfigService
): () => Promise<AppConfig> {
  return () => appConfigSev.loadConfig().toPromise();
}

/**
 * APP Config Injection Token
 */
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

/**
 * APP Config Provider
 */
export const AppConfigProvider = {
  provide: APP_CONFIG,
  useFactory: (config: AppConfigService): AppConfig => {
    return config.appConfig;
  },
  deps: [AppConfigService],
};
