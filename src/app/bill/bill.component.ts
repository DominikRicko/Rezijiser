import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BillService} from '../_services/bill.service';
import {DatePipe} from '@angular/common';
import {DataService} from '../_services/data.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Bill} from '../_model/bill';
import {BillBuilder} from '../_model/bill-builder';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
    // eslint-disable-next-line max-len
    cost: new FormControl('', [Validators.required, Validators.min(0), Validators.max(9999), Validators.pattern(new RegExp(/^[1-9]\d*(\.\d+)?$/))]),
    type: new FormControl('', [Validators.required]),
    counter: new FormControl('', [Validators.min(0), Validators.max(1000), Validators.pattern(new RegExp(/^[1-9]\d*(\.\d+)?$/))])
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
      this.bill = JSON.parse(JSON.stringify(this.dataService.bill));
      this.dataService.bill = BillBuilder.build();
    }
  }

  onSubmit() {
    const newBill: Bill = BillBuilder.build();

    newBill.identificator = this.bill.identificator;
    newBill.cost = this.bill.cost;
    if (this.bill.payday != null) {
      newBill.payday = new Date(new Date(this.bill.payday).getTime() + 3600 * 1000);
    }
    if (this.bill.datePaid != null) {
      newBill.datePaid = new Date(new Date(this.bill.datePaid).getTime() + 3600 * 1000);
    }
    if (this.counterType.includes(this.bill.type)) {
      newBill.counter = this.bill.counter;
    }

    if (!this.isEdit) {
      this.billService.saveBill(newBill, this.bill.type).subscribe(
        (data) => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['detail'], {queryParams: {type: this.bill.type}});
        },
        (error) => {
          this.snackBar.open('Greška prilikom pravljenja računa.', null, {duration: 5000});
        },
        () => {
          this.snackBar.open('Uspješno spremljen račun.', null, {duration: 5000});
          this.dialogRef.close();
        }
      );
    } else {
      this.billService.updateBill(newBill, this.bill.type).subscribe(
        (data) => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['detail'], {queryParams: {type: this.bill.type}});
        },
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
}
