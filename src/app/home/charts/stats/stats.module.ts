import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StatsRoutingModule} from './stats-routing.module';
import { HelperModule } from '../../../_helpers/helper.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StatsRoutingModule,
    HelperModule
  ]
})
export class StatsModule {
}
