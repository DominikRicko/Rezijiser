import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CommunalComponent} from './communal.component';
import {CommunalRoutingModule} from './communal-routing.module';

@NgModule({
  declarations: [CommunalComponent],
  imports: [CommonModule, SharedModule, CommunalRoutingModule, ReactiveFormsModule]
})
export class CommunalModule {}
