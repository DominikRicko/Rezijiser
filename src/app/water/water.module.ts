import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {WaterComponent} from './water.component';
import {WaterRoutingModule} from './water-routing.module';

@NgModule({
  declarations: [WaterComponent],
  imports: [CommonModule, SharedModule, WaterRoutingModule, ReactiveFormsModule]
})
export class WaterModule {}
