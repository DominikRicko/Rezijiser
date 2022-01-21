import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../_services/data.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  @Input() update: Subject<boolean> = new Subject<boolean>();
  minBill = {
    type: ''
  };
  maxBill = {
    type: ''
  };
  avgBill = 0;
  numOfBills = 0;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.update.subscribe(response => {
      let max = Number.MIN_VALUE;
      let min = Number.MAX_VALUE;
      let sum = 0;
      let numOfBills = 0;
      this.dataService.bills.forEach((bills, index) => {
        const type = this.dataService.types[index];
        bills.forEach((bill) => {
          if (bill.cost > max) {
            max = bill.cost;
            this.maxBill = bill;
            this.maxBill.type = type;
          }
          if (bill.cost < min) {
            min = bill.cost;
            this.minBill = bill;
            this.minBill.type = type;
          }
          sum += +bill.cost;
          numOfBills++;
        });
      });
      this.numOfBills = numOfBills;
      this.avgBill = sum / numOfBills;
    });
  }

}
