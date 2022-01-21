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
  options: any;
  selectedType = 'gas';
  update: Subject<boolean> = new Subject<boolean>();

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
        this.refreshData();
      });
    });
  }

  refreshData(){
    this.update.next(true);
  }
}
