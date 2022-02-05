import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../_services/data.service';
import {Observable} from 'rxjs';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() data: Observable<{ value: string; name: string; date?: Date }[]>;
  options: any;

  constructor(public dataService: DataService) {
    this.options = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} kn'
      },
      xAxis: {
        type: 'category',
        silent: true,
        boundaryGap: true,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          rotate: 30
        },
        data: [],
      },
      yAxis: {},
      series: [
        {
          name: 'Cijena',
          type: 'bar',
          colorBy: 'data',
          label: {
            show: true,
            position: 'top'
          },
          data: [],
          animationDelay: (idx) => idx * 10,
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
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
            formatter: (params) => {
              if (data.length > 0 && data[0].date) {
                // eslint-disable-next-line max-len
                return `${params.seriesName}<br/>${params.data.name}: ${params.data.value} HRK<br/>Datum: ${formatDate(new Date(params.data.date), 'd. MMM. yyyy.', 'hr-HR')}`;
              } else {
                return `${params.seriesName}<br/>${params.data.name}: ${params.data.value} HRK`;
              }
            }
          },
          xAxis: {
            type: 'category',
            silent: true,
            boundaryGap: true,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              rotate: 30
            },
            data: types,
          },
          yAxis: {},
          series: [
            {
              name: 'Cijena',
              type: 'bar',
              colorBy: 'data',
              label: {
                show: true,
                position: 'top'
              },
              data,
              animationDelay: (idx) => idx * 10,
            }
          ],
          animationEasing: 'elasticOut',
          animationDelayUpdate: (idx) => idx * 5,
        };
      }
    });
  }
}
