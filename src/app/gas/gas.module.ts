import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {GasComponent} from './gas.component';
import {GasRoutingModule} from './gas-routing.module';

@NgModule({
  declarations: [GasComponent],
  imports: [CommonModule, SharedModule, GasRoutingModule]
})
export class GasModule {}
