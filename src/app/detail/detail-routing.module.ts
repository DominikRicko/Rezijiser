import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {DetailComponent} from './detail.component';
import {AuthGuard} from '../_helpers/auth.guard';

const routes: Routes = [
  {
    path: 'detail',
    component: DetailComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailRoutingModule {
}
