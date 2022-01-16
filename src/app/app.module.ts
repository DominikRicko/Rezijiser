import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

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
import {TelecommunicationModule} from './telecommunication/telecommunication.module';
import {TrashModule} from './trash/trash.module';
import {WaterModule} from './water/water.module';
import {ExportModule} from './export/export.module';
import {BillModule} from './bill/bill.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

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
    TelecommunicationModule,
    TrashModule,
    WaterModule,
    ExportModule,
    BillModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
