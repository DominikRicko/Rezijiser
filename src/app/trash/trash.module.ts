import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {TrashComponent} from './trash.component';
import {TrashRoutingModule} from './trash-routing.module';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [TrashComponent],
  imports: [CommonModule, SharedModule, TrashRoutingModule, ReactiveFormsModule, MatTableModule, MatSortModule, MatPaginatorModule]
})
export class TrashModule {}
