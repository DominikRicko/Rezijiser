import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {WaterComponent} from './water.component';
import {WaterRoutingModule} from './water-routing.module';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [WaterComponent],
  imports: [CommonModule, SharedModule, WaterRoutingModule, ReactiveFormsModule, MatTableModule, MatSortModule, MatPaginatorModule]
})
export class WaterModule {}
