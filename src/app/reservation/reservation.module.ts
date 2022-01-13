import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ReservationComponent} from './reservation.component';
import {ReservationRoutingModule} from './reservation-routing.module';

@NgModule({
  declarations: [ReservationComponent],
  imports: [CommonModule, SharedModule, ReservationRoutingModule, ReactiveFormsModule]
})
export class ReservationModule {}
