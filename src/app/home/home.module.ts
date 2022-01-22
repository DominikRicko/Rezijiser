import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import {NgxEchartsModule} from 'ngx-echarts';
import {MatSelectModule} from '@angular/material/select';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { StatsComponent } from './charts/stats/stats.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import {MatCardModule} from '@angular/material/card';
import {DetailModule} from '../detail/detail.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HomeComponent, BarChartComponent, StatsComponent, PieChartComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    DetailModule
  ]
})
export class HomeModule {}
