import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {ExportComponent} from './export.component';
import {ExportRouterModule} from './export-router.module';

@NgModule({
  declarations: [ExportComponent],
  imports: [CommonModule, SharedModule, ExportRouterModule]
})
export class ExportModule {}
