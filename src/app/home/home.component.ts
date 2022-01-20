import { Component, OnInit } from '@angular/core';
import {BillService} from '../_services/bill.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  types = ['Struja', 'Voda', 'Plin', 'Pričuva', 'Odvoz smeća', 'Komunalac', 'HRT', 'Telekomunikacije'];
  typeValue = ['power', 'water', 'gas', 'reservation', 'trash', 'communal', 'hrt', 'telecom'];
  options: any;
  selectedType = 'gas';

  constructor(private billService: BillService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    const xAxisData = [];
    const cost = [];
    const counter = [];
    this.billService.getAll(this.selectedType).subscribe((data) => {
      data.forEach((bill) => {
        xAxisData.push(bill.payday);
        cost.push(bill.cost);
        counter.push(bill.counter);
      });
      this.options = {
        legend: {
          data: ['Cijena', 'Potrošnja'],
          align: 'left',
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
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
          },
          {
            name: 'Potrošnja',
            type: 'bar',
            data: counter,
            animationDelay: (idx) => idx * 10 + 100,
          },
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: (idx) => idx * 5,
      };
    });
  }
}
