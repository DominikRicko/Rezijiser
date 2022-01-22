import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../_services/data.service';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() data: {value: string; name: string; date?: string}[];
  @Input() update: Observable<boolean>;
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
    console.log('ngOnInit');
    this.update.subscribe(response => {
        if (response) {
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
              data: this.dataService.types,
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
                data: this.data,
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
