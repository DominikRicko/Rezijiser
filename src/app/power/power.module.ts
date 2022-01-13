import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {PowerComponent} from './power.component';
import {PowerRoutingModule} from './power-routing.module';

@NgModule({
  declarations: [PowerComponent],
  imports: [CommonModule, SharedModule, PowerRoutingModule, ReactiveFormsModule]
})
export class PowerModule {}
