import { Component, OnInit } from '@angular/core';
import {BillService} from '../_services/bill.service';
import {DataService} from '../_services/data.service';
import {Subject} from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
  public formControl: FormGroup;
  public startingDate: string;
  public endingDate: string;

  private types = ['Struja', 'Voda', 'Plin', 'Pričuva', 'Odvoz smeća', 'Komunalac', 'HRT', 'Telekomunikacije'];
  private typeValue = ['power', 'water', 'gas', 'reservation', 'trash', 'communal', 'hrt', 'telecom'];

  private sumSubject = new Subject<{value: string; name: string}[]>();
  private avgSubject = new Subject<{value: string; name: string}[]>();
  private minSubject = new Subject<{value: string; name: string; date: string}[]>();
  private maxSubject = new Subject<{value: string; name: string; date: string}[]>();

  private datePipe = new DatePipe('en-US');

  constructor(private billService: BillService, public dataService: DataService, private formBuilder: FormBuilder) {

    this.sumData = this.sumSubject.asObservable();
    this.avgData = this.avgSubject.asObservable();
    this.maxData = this.maxSubject.asObservable();
    this.minData = this.minSubject.asObservable();
    this.formControl = formBuilder.group({
      startingDate: '',
      endingDate: ''
    });
   }

  ngOnInit(): void {
    const subject = new Subject<boolean>();
    let counter = 0;
    this.dataService.bills = [];
    this.dataService.types = [];
    this.typeValue.forEach((type) => {
      this.billService.getAll(type).subscribe((bills) => {
        this.dataService.bills.push(bills);
        this.dataService.types.push(this.types[this.typeValue.indexOf(type)]);
        subject.next(true);
      }, (error) => { console.log(error); });
    });

    subject.subscribe((value) => {
      counter++;
      if(counter === 8){
        this.refreshData(null, null);
      }
    });
  }

  refreshData(startingDate: Date, endingDate: Date){
    this.sumSubject.next(this.getSumByBillType(startingDate, endingDate));
    this.avgSubject.next(this.getAverageByBillType(startingDate, endingDate));
    this.maxSubject.next(this.getMaxByBillType(startingDate, endingDate));
    this.minSubject.next(this.getMinByBillType(startingDate, endingDate));
  }

  getSumByBillType(startingDate: Date, endingDate: Date): {value: string; name: string}[]{
    const cost = [];
    this.dataService.bills.forEach((bills, index) => {
      if(bills.length === 0){
        return;
      }
      let sum = 0;
      bills.forEach((bill) => {
        if(startingDate != null && endingDate != null){
          if(new Date(bill.payday).getTime() >= startingDate.getTime() && new Date(bill.payday).getTime() <= endingDate.getTime()){
            sum += +bill.cost;
          }
        } else {
          sum += +bill.cost;
        }
      });
      cost.push({value: sum.toFixed(2), name: this.dataService.types[index]});
    });
    return cost;
  }

  getMaxByBillType(startingDate: Date, endingDate: Date): {value: string; name: string; date: string}[]{
    const cost = [];
    this.dataService.bills.forEach((bills, index) => {
      if(bills.length === 0){
        return;
      }
      let maxIndex = 0;
      bills.forEach((bill, index2) => {
        if(startingDate != null && endingDate != null){
          if(new Date(bill.payday).getTime() >= startingDate.getTime() && new Date(bill.payday).getTime() <= endingDate.getTime()){
            if(Number.parseFloat(bills[maxIndex].cost) < Number.parseFloat(bill.cost)){
              maxIndex = index2;
            }
          }
        } else {
          if(Number.parseFloat(bills[maxIndex].cost) < Number.parseFloat(bill.cost)){
            maxIndex = index2;
          }
        }
      });
      cost.push({
        value: Number.parseFloat(bills[maxIndex].cost).toFixed(2),
        name: this.dataService.types[index], date: bills[maxIndex].payday
      });
    });
    return cost;
  }

  getMinByBillType(startingDate: Date, endingDate: Date): {value: string; name: string; date: string}[]{
    const cost = [];
    this.dataService.bills.forEach((bills, index) => {
      if(bills.length === 0){
        return;
      }
      let minIndex = 0;
      bills.forEach((bill, index2) => {
        if(startingDate != null && endingDate != null){
          if(new Date(bill.payday).getTime() >= startingDate.getTime() && new Date(bill.payday).getTime() <= endingDate.getTime()){
            if(Number.parseFloat(bills[minIndex].cost) > Number.parseFloat(bill.cost)){
              minIndex = index2;
            }
          }
        } else {
          if(Number.parseFloat(bills[minIndex].cost) > Number.parseFloat(bill.cost)){
            minIndex = index2;
          }
        }
      });
      cost.push({
          value: Number.parseFloat(bills[minIndex].cost).toFixed(2),
          name: this.dataService.types[index], date: bills[minIndex].payday
        });
    });
    return cost;
  }

  getAverageByBillType(startingDate: Date, endingDate: Date): {value: string; name: string}[]{
    const cost = [];
    let counter = 0;
    this.dataService.bills.forEach((bills, index) => {
      if(bills.length === 0){
        return;
      }
      let avg = 0;
      bills.forEach((bill) => {
        if(startingDate != null && endingDate != null){
          if(new Date(bill.payday).getTime() >= startingDate.getTime() && new Date(bill.payday).getTime() <= endingDate.getTime()){
            avg += +bill.cost;
            counter++;
          }
        } else {
          avg += +bill.cost;
          counter++;
        }
      });
      avg /= counter;
      cost.push({value: avg.toFixed(2), name: this.dataService.types[index]});
    });
    return cost;
  }

  filterRefreshData(){
    if(this.startingDate == null || this.endingDate == null){
      this.refreshData(null, null);
    } else {
      this.refreshData(new Date(this.formatDate(this.startingDate)), new Date(this.formatDate(this.endingDate)));
    }
  }

  resetFilter(){
    this.startingDate = null;
    this.endingDate = null;
    this.refreshData(null, null);
  }

  private formatDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
