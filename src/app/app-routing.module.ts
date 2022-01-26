import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './shared/components';

import {HomeRoutingModule} from './home/home-routing.module';
import {DetailRoutingModule} from './detail/detail-routing.module';
import {LoginRoutingModule} from './login/login-routing.module';
import {RegisterRoutingModule} from './register/register-routing.module';
import {ExportRouterModule} from './export/export-router.module';
import {BillRoutingModule} from './bill/bill-routing.module';

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
    RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy', useHash: true}),
    HomeRoutingModule,
    DetailRoutingModule,
    LoginRoutingModule,
    RegisterRoutingModule,
    BillRoutingModule,
    ExportRouterModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
