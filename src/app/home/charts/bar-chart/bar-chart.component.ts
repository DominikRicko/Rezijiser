import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../_services/data.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() update: Subject<boolean> = new Subject<boolean>();
  options: any;

  constructor(public dataService: DataService) {  }

  ngOnInit(): void {
    this.update.subscribe(response => {
        const cost = [];
        this.dataService.bills.forEach((bills, index) => {
          let sum = 0;
          bills.forEach((bill) => {
            sum += +bill.cost;
          });
          cost.push({value: sum, name: this.dataService.types[index]});
        });
        if (response) {
          this.options = {
            legend: {
              data: this.dataService.types,
              align: 'left',
            },
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
                data: cost,
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
