import { Component, Inject, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BillService} from '../_services/bill.service';
import {DatePipe} from '@angular/common';
import {DataService} from '../_services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bill } from '../_model/Bill';
import { BillBuilder } from '../_model/BillBuilder';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  bill: any = {};
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
      this.dataService.bill = BillBuilder.build();
    }
  }

  onSubmit() {
    const newBill: Bill = BillBuilder.build();

    newBill.identificator = this.bill.identificator;
    newBill.cost = this.bill.cost;
    newBill.payday = this.bill.payday;
    newBill.datePaid = this.bill.datePaid;

    if (this.counterType.includes(this.bill.type)) {
      newBill.counter = this.bill.counter;
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
