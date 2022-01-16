import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {PowerComponent} from './power.component';
import {PowerRoutingModule} from './power-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [PowerComponent],
  imports: [CommonModule, SharedModule, PowerRoutingModule, MatSortModule, MatTableModule, MatPaginatorModule]
})
export class PowerModule {}
