import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from '../../../_services/data.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() data: Observable<{ value: string; name: string }[]>;
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
          radius: [0, 110],
          data: []
        }
      ]
    };
  }

  ngOnInit(): void {
    this.data.subscribe(data => {
      if (data) {
        const types: string[] = [];
        data.forEach(it => {
          types.push(it.name);
        });
        this.options = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} kn ({d}%)'
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: types
          },
          calculable: true,
          series: [
            {
              name: 'Udio',
              type: 'pie',
              radius: [5, 110],
              label: {
                alignTo: 'edge',
                edgeDistance: '10%'
              },
              labelLine: {
                length: 20
              },
              data
            }
          ]
        };
      }
    });
  }

}
