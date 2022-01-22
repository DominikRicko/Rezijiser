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
  public sumData = null;
  public avgData = null;
  public maxData = null;
  public minData = null;
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
        this.refreshData(); //this is clearly inefficient way to solve a stupid problem of infinite loop between components.
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
    console.log(this.sumData);
  }

  refreshData(){
    this.sumData = this.getSumByBillType();
    this.avgData = this.getAverageByBillType();
    this.maxData = this.getMaxByBillType();
    this.minData = this.getMinByBillType();
    this.update.next(true);
  }

  getSumByBillType(): {value: string; name: string}[]{
    const cost = [];
    this.dataService.bills.forEach((bills, index) => {
      if(bills.length === 0){
        return;
      }
      let sum = 0;
      bills.forEach((bill) => {
        sum += +bill.cost;
      });
      cost.push({value: sum.toFixed(2), name: this.dataService.types[index]});
    });
    return cost;
  }

  getMaxByBillType(): {value: string; name: string; date: string}[]{
    const cost = [];
    this.dataService.bills.forEach((bills, index) => {
      if(bills.length === 0){
        return;
      }
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
    return cost;
  }

  getMinByBillType(): {value: string; name: string; date: string}[]{
    const cost = [];
    this.dataService.bills.forEach((bills, index) => {
      if(bills.length === 0){
        return;
      }
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
    return cost;
  }

  getAverageByBillType(): {value: string; name: string}[]{
    const cost = [];
    this.dataService.bills.forEach((bills, index) => {
      if(bills.length === 0){
        return;
      }
      let avg = 0;
      bills.forEach((bill) => {
        avg += +bill.cost;
      });
      avg /= bills.length;
      cost.push({value: avg.toFixed(2), name: this.dataService.types[index]});
    });
    return cost;
  }

}
