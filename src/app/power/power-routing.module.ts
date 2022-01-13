import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {PowerComponent} from './power.component';
import {AuthGuard} from '../_helpers/auth.guard';

const routes: Routes = [
  {
    path: 'power',
    component: PowerComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PowerRoutingModule {}
