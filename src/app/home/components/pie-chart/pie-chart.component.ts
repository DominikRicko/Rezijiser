import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() data: any;
  @Input() xAxis: any;
  options: any;

  constructor() { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.options = {
      title: {
        text: 'Prikaz udjela pojedine kategorije',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: this.xAxis
      },
      calculable: true,
      series: [
        {
          name: 'Udio',
          type: 'pie',
          radius: [30, 110],
          roseType: 'area',
          data: [Object.fromEntries(this.data.map((_, i) => [this.data[i], this.xAxis[i]]))]
        }
      ]
    };
  }

}
