import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatSortable} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {BillService} from '../_services/bill.service';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../_services/data.service';
import {MatDialog} from '@angular/material/dialog';
import {BillComponent} from '../bill/bill.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Bill} from '../_model/bill';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayColumns = ['payday', 'paid', 'datePaid', 'cost', 'counter', 'action'];
  counterType = ['power', 'water', 'gas'];
  dataSource: MatTableDataSource<Bill>;
  type: string;
  formControl: FormGroup;

  constructor(
    private billService: BillService,
    private route: ActivatedRoute,
    public dataService: DataService,
    public dialog: MatDialog,
    formBuilder: FormBuilder
  ) {
    this.formControl = formBuilder.group({
      fromDatePayday: '',
      toDatePayday: '',
      paid: 'Sve',
      fromDatePaid: '',
      toDatePaid: '',
      cost: '',
      counter: ''
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.type = params.type;
      if (!this.counterType.includes(this.type)) {
        this.displayColumns = ['payday', 'paid', 'datePaid', 'cost', 'action'];
      } else {
        this.displayColumns = ['payday', 'paid', 'datePaid', 'cost', 'counter', 'action'];
      }
      this.billService.getAll(this.type).subscribe((data) => {
        this.dataSource = new MatTableDataSource<Bill>(data);
        console.log(data);
        this.sort.sort(({id: 'payday', start: 'desc'} as MatSortable));
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = ((row, filter) => {
          if (filter.fromDatePayday && !filter.toDatePayday) {
            filter.toDatePayday = filter.fromDatePayday;
          }
          if (!filter.fromDatePayday && filter.toDatePayday) {
            filter.fromDatePayday = filter.toDatePayday;
          }
          if (filter.fromDatePaid && !filter.toDatePaid) {
            filter.toDatePaid = filter.fromDatePaid;
          }
          if (!filter.fromDatePaid && filter.toDatePaid) {
            filter.fromDatePaid = filter.toDatePaid;
          }
          const payday = (!filter.fromDatePayday) ||
            (new Date(row.payday) >= (filter.fromDatePayday) &&
              new Date(row.payday) <= (filter.toDatePayday));
          const paid = !filter.paid ||
            (filter.paid === 'Ne' && new Date(row.datePaid) === null) ||
            (filter.paid === 'Da' && new Date(row.datePaid) !== null) ||
            filter.paid === 'Sve';
          const datePaid = !filter.fromDatePaid ||
            (new Date(row.datePaid) >= (filter.fromDatePaid) &&
              new Date(row.datePaid) <= (filter.toDatePaid));
          const cost = !filter.cost || row.cost.includes(filter.cost);
          const counter = !filter.counter || row.counter.includes(filter.counter);
          return payday && paid && cost && counter && datePaid;
        }) as (Bill) => boolean;
      });
    });
  }

  refreshTable() {
    this.billService.getAll(this.type).subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  isPaid(datePaid: Date): string {
    if (datePaid != null) {
      return ' Da ';
    } else {
      return ' Ne ';
    }
  }

  delete(detail: Bill): void {
    this.billService.deleteBill(detail.identificator, this.type).subscribe((data) => {
      this.refreshTable();
    });
  }

  update(detail: Bill): void {
    this.dataService.bill = detail;
    this.dataService.bill.type = this.type;
    this.dialog.open(BillComponent, {
      data: true
    });
  }

  resetFilter() {
    this.formControl.reset({
      fromDatePayday: '',
      toDatePayday: '',
      paid: 'Sve',
      fromDatePaid: '',
      toDatePaid: '',
      cost: '',
      counter: ''
    });
    this.dataSource.filter = this.formControl.value;
  }

  filter() {
    this.dataSource.filter = this.formControl.value;
  }

}

