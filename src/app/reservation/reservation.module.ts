import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ReservationComponent} from './reservation.component';
import {ReservationRoutingModule} from './reservation-routing.module';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [ReservationComponent],
  imports: [CommonModule, SharedModule, ReservationRoutingModule, ReactiveFormsModule, MatTableModule, MatSortModule, MatPaginatorModule]
})
export class ReservationModule {}
