import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {GasComponent} from './gas.component';
import {GasRoutingModule} from './gas-routing.module';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [GasComponent],
  imports: [CommonModule, SharedModule, GasRoutingModule, MatTableModule, MatSortModule, MatPaginatorModule]
})
export class GasModule {}
