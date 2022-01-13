import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../_helpers/auth.guard';
import {TelecommunicationComponent} from './telecommunication.component';

const routes: Routes = [
  {
    path: 'telecom',
    component: TelecommunicationComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelecommunicationRoutingModule {}
