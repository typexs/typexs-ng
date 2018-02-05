
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode, NgModule} from '@angular/core';

// import { AppModule } from './app/app.module';
import {environment} from './environments/environment';
import {BrowserModule} from "@angular/platform-browser";

if (environment.production) {
  enableProdMode();
}

/*
function create() {
  let buf = fs.readFileSync('./generated/app.module.ts.tmpl');
  fs.writeFileSync('./generated/app.module.ts',buf);
}

create()
*/
import {AppModule} from "./generated/app.module";


platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));

