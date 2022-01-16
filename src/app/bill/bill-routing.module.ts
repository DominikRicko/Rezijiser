import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../_helpers/auth.guard';
import {BillComponent} from './bill.component';

const routes: Routes = [
  {
    path: 'bill',
    component: BillComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRoutingModule {}
