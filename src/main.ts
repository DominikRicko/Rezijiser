import {enableProdMode, LOCALE_ID} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { APP_CONFIG } from './environments/environment';

if (APP_CONFIG.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    preserveWhitespaces: false,
    providers: [{provide: LOCALE_ID, useValue: 'hr-HR' }]
  })
  .catch(err => console.error(err));
