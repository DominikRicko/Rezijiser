import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import {NgxEchartsModule} from 'ngx-echarts';
import {MatSelectModule} from '@angular/material/select';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import {MatButtonModule} from "@angular/material/button";
import { StatsComponent } from './components/stats/stats.component';

@NgModule({
  declarations: [HomeComponent, BarChartComponent, PieChartComponent, StatsComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    MatSelectModule,
    MatButtonModule
  ]
})
export class HomeModule {}
