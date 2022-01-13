import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HrtComponent} from './hrt.component';
import {HrtRoutingModule} from './hrt-routing.module';

@NgModule({
  declarations: [HrtComponent],
  imports: [CommonModule, SharedModule, HrtRoutingModule, ReactiveFormsModule]
})
export class HrtModule {}
