import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../_helpers/auth.guard';
import {ExportComponent} from './export.component';

const routes: Routes = [
  {
    path: 'export',
    component: ExportComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportRouterModule {
}
