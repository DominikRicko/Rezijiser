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
import {ExportModule} from './export/export.module';
import {BillModule} from './bill/bill.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataService} from './_services/data.service';
import {MatSnackBar} from "@angular/material/snack-bar";

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
    ExportModule,
    BillModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [AuthGuard, DataService, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule {}
