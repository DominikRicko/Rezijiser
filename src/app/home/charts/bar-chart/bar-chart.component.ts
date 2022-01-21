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
        this.dataService.bills.forEach((bills) => {
          let sum = 0;
          bills.forEach((bill) => {
            sum += +bill.cost;
          });
          cost.push(sum);
        });
        if (response) {
          this.options = {
            legend: {
              data: ['Cijena'],
              align: 'left',
            },
            tooltip: {},
            xAxis: {
              data: this.dataService.types,
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
