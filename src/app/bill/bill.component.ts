import { Component, Inject, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BillService} from '../_services/bill.service';
import {DatePipe} from '@angular/common';
import {DataService} from '../_services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bill } from '../_model/Bill';
import { BillBuilder } from '../_model/BillBuilder';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';

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
  formControl: FormGroup = new FormGroup({
    payday: new FormControl('', [Validators.required]),
    datePaid: new FormControl(),
    cost: new FormControl('', [Validators.required, Validators.min(0), Validators.max(9999)]),
    type: new FormControl('', [Validators.required]),
    counter: new FormControl('', [Validators.min(0), Validators.max(1000)])
  });

  constructor(
    private billService: BillService,
    private router: Router,
    public dataService: DataService,
    public dialogRef: MatDialogRef<BillComponent>,
    private snackBar: MatSnackBar,
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
      this.billService.saveBill(newBill, this.bill.type).subscribe(
        (data) => {
          this.router.navigate(['detail'], { queryParams: { type: this.bill.type } });
      },
      (error) => {
          this.snackBar.open('Greška prilikom pravljenja računa.', null, {duration: 5000});
          },
      () => {
          this.snackBar.open('Uspješno spremljen račun.', null, {duration: 5000});
          this.dialogRef.close();}
      );
    } else {
      this.billService.updateBill(newBill, this.bill.type).subscribe(
        (data) => {
        this.router.navigate(['detail'], { queryParams: { type: this.bill.type }}); },
        (error) => {
          this.snackBar.open('Greška prilikom ažuriranja računa.', null, {duration: 5000});
          },
        () => {
          this.snackBar.open('Uspješno ažuriran račun.', null, {duration: 5000});
          this.dialogRef.close();
        }
      );
    }

  }

  cancel() {
    this.dialogRef.close();
  }

  private formatDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
