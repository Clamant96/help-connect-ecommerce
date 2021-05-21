import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

/* FICA OBSERVANDO SEMPRE QUE A PAGINA E RECARREGADA */
window.addEventListener('beforeunload', function(event) {
  localStorage.removeItem('token');

}, false);
