import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './home/home.module';
import { DetailModule } from './detail/detail.module';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import {RegisterModule} from './register/register.module';
import {AuthGuard} from './_helpers/auth.guard';
import {CommunalModule} from './communal/communal.module';
import {GasModule} from './gas/gas.module';
import {HrtModule} from './hrt/hrt.module';
import {PowerModule} from './power/power.module';
import {ReservationModule} from './reservation/reservation.module';
import {SettingsModule} from './settings/settings.module';
import {TelecommunicationModule} from './telecommunication/telecommunication.module';
import {TrashModule} from './trash/trash.module';
import {WaterModule} from './water/water.module';

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>  new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    DetailModule,
    LoginModule,
    RegisterModule,
    CommunalModule,
    GasModule,
    HrtModule,
    PowerModule,
    ReservationModule,
    SettingsModule,
    TelecommunicationModule,
    TrashModule,
    WaterModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
