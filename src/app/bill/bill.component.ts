import { Component, OnInit } from '@angular/core';
import {Bill} from './bill';
import {Router} from '@angular/router';
import {BillService} from '../_services/bill.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  bill: Bill = new Bill();
  types = ['Struja', 'Voda', 'Plin', 'Pričuva', 'Odvoz smeća', 'Komunalac', 'HRT', 'Telekomunikacije'];
  typeValue = ['power', 'water', 'gas', 'reservation', 'trash', 'communal', 'HRT', 'telecom'];
  counterType = ['power', 'water', 'gas'];
  datePipe = new DatePipe('en-US');

  constructor(private billService: BillService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const type = this.bill.type;
    let newBill = {};
    if (this.counterType.includes(type)) {
      newBill = {
        cost: this.bill.cost,
        payday: this.formatDate(this.bill.payday),
        datePaid: this.formatDate(this.bill.datePaid),
        counter: this.bill.count
      };
    } else {
      newBill = {
        cost: this.bill.cost,
        payday: this.formatDate(this.bill.payday),
        datePaid: this.formatDate(this.bill.datePaid)
      };
    }
    console.log(newBill);
    this.billService.saveBill(newBill, type).subscribe((data) => {
      console.log(data);
      this.router.navigate([type]);
    });
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  private formatDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
