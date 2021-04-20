import { environment } from '@environments/environment';

/**
 * Production 빌드에서 console 관련 제거
 *
 * @export
 * @return {*}  {() => void}
 */
export function OverrideConsole(): () => void {
  return () => {
    if (environment.production) {
      const consoleHolder: Console = window.console;
      Object.keys(consoleHolder).forEach((key) => {
        switch (key) {
          case 'assert':
          case 'clear':
          case 'debug':
          case 'info':
          case 'log':
          case 'table':
          case 'trace':
          case 'warn':
          case 'dir':
          case 'dirxml':
          case 'count':
          case 'countReset':
          case 'group':
          case 'groupCollapsed':
          case 'groupEnd':
          case 'time':
          case 'timeLog':
          case 'timeEnd': {
            window.console[key] = () => {};
            break;
          }
          default: {
            break;
          }
        }
      });
    }
  };
}
