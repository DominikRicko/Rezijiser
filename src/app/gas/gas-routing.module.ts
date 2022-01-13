import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../_helpers/auth.guard';
import {GasComponent} from './gas.component';

const routes: Routes = [
  {
    path: 'gas',
    component: GasComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GasRoutingModule {}
