import { Component, Inject, OnInit } from '@angular/core';
import {Bill} from './bill';
import {Router} from '@angular/router';
import {BillService} from '../_services/bill.service';
import {DatePipe} from '@angular/common';
import {DataService} from '../_services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  bill: Bill = new Bill();
  isEdit: boolean;
  types = ['Struja', 'Voda', 'Plin', 'Pričuva', 'Odvoz smeća', 'Komunalac', 'HRT', 'Telekomunikacije'];
  typeValue = ['power', 'water', 'gas', 'reservation', 'trash', 'communal', 'hrt', 'telecom'];
  counterType = ['power', 'water', 'gas'];
  datePipe = new DatePipe('en-US');

  constructor(
    private billService: BillService,
    private router: Router,
    public dataService: DataService,
    public dialogRef: MatDialogRef<BillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean,
  ) {
      this.isEdit = data;
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.bill = this.dataService.bill;
      this.dataService.bill = new Bill();
    }
  }

  onSubmit() {
    let newBill = {};
    if (this.counterType.includes(this.bill.type)) {
      newBill = {
        identificator: this.bill.identificator,
        cost: this.bill.cost,
        payday: this.formatDate(this.bill.payday),
        datePaid: this.formatDate(this.bill.datePaid),
        counter: this.bill.counter
      };
    } else {
      newBill = {
        identificator: this.bill.identificator,
        cost: this.bill.cost,
        payday: this.formatDate(this.bill.payday),
        datePaid: this.formatDate(this.bill.datePaid)
      };
    }
    if (!this.isEdit) {
      this.billService.saveBill(newBill, this.bill.type).subscribe((data) => {
        this.router.navigate(['detail'], { queryParams: { type: this.bill.type } });
      });
    } else {
      this.billService.updateBill(newBill, this.bill.type).subscribe((data) => {
        this.router.navigate(['detail'], { queryParams: { type: this.bill.type } });
      });
    }
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

  private formatDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
