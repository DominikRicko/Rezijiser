import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {TelecommunicationComponent} from './telecommunication.component';
import {TelecommunicationRoutingModule} from './telecommunication-routing.module';

@NgModule({
  declarations: [TelecommunicationComponent],
  imports: [CommonModule, SharedModule, TelecommunicationRoutingModule, ReactiveFormsModule]
})
export class TelecommunicationModule {}
