import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {DataService} from '../../../_services/data.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() update: Subject<boolean> = new Subject<boolean>();
  @Input() data: {value: string; name: string}[];
  options: any;

  constructor(public dataService: DataService) {
    this.options = {
      title: {
        text: 'Pita',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} kn ({d}%)'
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: []
      },
      calculable: true,
      series: [
        {
          name: 'Udio',
          type: 'pie',
          radius: [30, 110],
          roseType: 'area',
          data: []
        }
      ]
    };
   }

  ngOnInit(): void {
    this.update.subscribe(response => {
        if (response) {
          this.options = {
            title: {
              text: 'Pita',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} kn ({d}%)'
            },
            legend: {
              x: 'center',
              y: 'bottom',
              data: this.dataService.types
            },
            calculable: true,
            series: [
              {
                name: 'Udio',
                type: 'pie',
                radius: [30, 110],
                roseType: 'area',
                data: this.data
              }
            ]
          };
        }
    });
  }

}
