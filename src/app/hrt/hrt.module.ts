import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HrtComponent} from './hrt.component';
import {HrtRoutingModule} from './hrt-routing.module';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [HrtComponent],
  imports: [CommonModule, SharedModule, HrtRoutingModule, ReactiveFormsModule, MatTableModule, MatSortModule, MatPaginatorModule]
})
export class HrtModule {}
