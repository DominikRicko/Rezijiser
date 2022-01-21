import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {

  @Input() data: any;
  @Input() xAxis: any;
  options: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.options = {
      legend: {
        data: ['Cijena'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: this.xAxis,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'Cijena',
          type: 'bar',
          data: this.data,
          animationDelay: (idx) => idx * 10,
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }
}
