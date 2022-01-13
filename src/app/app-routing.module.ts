import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';
import {RegisterRoutingModule} from './register/register-routing.module';
import {PowerRoutingModule} from './power/power-routing.module';
import {WaterRoutingModule} from './water/water-routing.module';
import {GasRoutingModule} from './gas/gas-routing.module';
import {ReservationRoutingModule} from './reservation/reservation-routing.module';
import {TrashRoutingModule} from './trash/trash-routing.module';
import {CommunalRoutingModule} from './communal/communal-routing.module';
import {HrtRoutingModule} from './hrt/hrt-routing.module';
import {TelecommunicationRoutingModule} from './telecommunication/telecommunication-routing.module';
import {SettingsRoutingModule} from './settings/settings-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HomeRoutingModule,
    DetailRoutingModule,
    LoginRoutingModule,
    RegisterRoutingModule,
    PowerRoutingModule,
    WaterRoutingModule,
    GasRoutingModule,
    ReservationRoutingModule,
    TrashRoutingModule,
    CommunalRoutingModule,
    HrtRoutingModule,
    TelecommunicationRoutingModule,
    SettingsRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
