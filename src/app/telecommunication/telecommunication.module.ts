import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {TelecommunicationComponent} from './telecommunication.component';
import {TelecommunicationRoutingModule} from './telecommunication-routing.module';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [TelecommunicationComponent],
  imports: [CommonModule, SharedModule, TelecommunicationRoutingModule, ReactiveFormsModule, MatTableModule, MatSortModule, MatPaginatorModule]
})
export class TelecommunicationModule {}
