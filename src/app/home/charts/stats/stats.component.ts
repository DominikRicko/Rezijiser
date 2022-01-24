import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../_services/data.service';
import {Subject} from 'rxjs';
import {BillBuilder} from '../../../_model/BillBuilder';
import {Bill} from '../../../_model/Bill';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  @Input() update: Subject<boolean> = new Subject<boolean>();
  minBill: Bill[] = [];
  maxBill: Bill[] = [];
  avgAllBills = 0;
  avgPerType = [];
  numOfAllBills = 0;

  constructor(public dataService: DataService) {
  }

  ngOnInit(): void {
    this.update.subscribe(response => {
      let totalSum = 0;
      let numOfAllBills = 0;
      this.dataService.bills.forEach((bills, index) => {
        let tempMinBill = BillBuilder.build();
        let tempMaxBill = BillBuilder.build();
        let max = Number.MIN_VALUE;
        let min = Number.MAX_VALUE;
        let sum = 0;
        let numOfBills = 0;
        bills.forEach((bill) => {
          if (Number.parseFloat(bill.cost) > max) {
            max = Number.parseFloat(bill.cost);
            tempMaxBill = bill;
          }
          if (Number.parseFloat(bill.cost) < min) {
            min = Number.parseFloat(bill.cost);
            tempMinBill = bill;
          }
          sum += +bill.cost;
          totalSum += +bill.cost;
          numOfBills++;
          numOfAllBills++;
        });
        this.avgPerType.push({cost: (sum / numOfBills), billNum: numOfBills, type: this.dataService.types[index]});
        tempMinBill.type = this.dataService.types[index];
        tempMaxBill.type = this.dataService.types[index];
        this.minBill.push(tempMinBill);
        this.maxBill.push(tempMaxBill);
      });
      this.numOfAllBills = numOfAllBills;
      this.avgAllBills = totalSum / numOfAllBills;
    });
  }

}
