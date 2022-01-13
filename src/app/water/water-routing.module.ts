import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../_helpers/auth.guard';
import {WaterComponent} from './water.component';

const routes: Routes = [
  {
    path: 'water',
    component: WaterComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterRoutingModule {}
