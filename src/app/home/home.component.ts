import { Component, OnInit } from '@angular/core';
import {BillService} from '../_services/bill.service';
import {DataService} from '../_services/data.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  types = ['Struja', 'Voda', 'Plin', 'Pričuva', 'Odvoz smeća', 'Komunalac', 'HRT', 'Telekomunikacije'];
  typeValue = ['power', 'water', 'gas', 'reservation', 'trash', 'communal', 'hrt', 'telecom'];
  update: Subject<boolean> = new Subject<boolean>();
  private counter = 0;

  constructor(private billService: BillService, public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.bills = [];
    this.dataService.types = [];
    this.typeValue.forEach((type) => {
      this.billService.getAll(type).subscribe((bills) => {
        this.dataService.bills.push(bills);
        this.dataService.types.push(this.types[this.typeValue.indexOf(type)]);
      },
        (error) => { console.log(error); },
        () => {
        this.counter++;
        if (this.counter === 8) {
          this.refreshData();
          this.counter = 0;
        }
      });
    });
  }

  refreshData(){
    this.update.next(true);
  }

  getSumByBillType(): {value: string; name: string}[]{
    const cost = [];
    this.dataService.bills.forEach((bills, index) => {
      let sum = 0;
      bills.forEach((bill) => {
        sum += +bill.cost;
      });
      cost.push({value: sum, name: this.dataService.types[index]});
    });
    this.refreshData();
    return cost;
  }

  getMaxByBillType(): {value: string; name: string; date: string}[]{
    const cost = [];
    this.dataService.bills.forEach((bills, index) => {
      let maxIndex = 0;
      bills.forEach((bill, index2) => {
        if(Number.parseFloat(bills[maxIndex].cost) < Number.parseFloat(bill.cost)){
          maxIndex = index2;
        }
      });
      cost.push({
        value: Number.parseFloat(bills[maxIndex].cost).toFixed(2),
        name: this.dataService.types[index], date: bills[maxIndex].payday
      });
    });
    this.refreshData();
    return cost;
  }

  getMinByBillType(): {value: string; name: string; date: string}[]{
    const cost = [];
    this.dataService.bills.forEach((bills, index) => {
      let minIndex = 0;
      bills.forEach((bill, index2) => {
        if(Number.parseFloat(bills[minIndex].cost) > Number.parseFloat(bill.cost)){
          minIndex = index2;
        }
      });
      cost.push({
          value: Number.parseFloat(bills[minIndex].cost).toFixed(2),
          name: this.dataService.types[index], date: bills[minIndex].payday
        });
    });
    this.refreshData();
    return cost;
  }

  getAverageByBillType(): {value: string; name: string}[]{
    const cost = [];
    this.dataService.bills.forEach((bills, index) => {
      let avg = 0;
      bills.forEach((bill) => {
        avg += +bill.cost;
      });
      avg /= bills.length;
      cost.push({value: avg.toFixed(2), name: this.dataService.types[index]});
    });
    this.refreshData();
    return cost;
  }

}
