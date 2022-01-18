import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatSortable} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {BillService} from '../_services/bill.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../_services/data.service';
import {Bill} from '../bill/bill';
import {FormControl, FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';

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
  datePipe = new DatePipe('en-US');

  filterForm = new FormGroup({
    fromDatePayday: new FormControl(),
    toDatePayday: new FormControl(),
    paid: new FormControl(),
    fromDatePaid: new FormControl(),
    toDatePaid: new FormControl()
  });
  constructor(
    private billService: BillService,
    private route: ActivatedRoute,
    public dataService: DataService,
    private router: Router
  ) { }

  get fromDatePayday() { return this.filterForm.get('fromDatePayday').value; }
  get toDatePayday() { return this.filterForm.get('toDatePayday').value; }
  get paid() { return this.filterForm.get('paid').value; }
  get fromDatePaid() { return this.filterForm.get('fromDatePaid').value; }
  get toDatePaid() { return this.filterForm.get('toDatePaid').value; }

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
        this.sort.sort(({ id: 'payday', start: 'desc'} as MatSortable));
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (row, filter) => {
          let result = true;
          if (this.fromDatePayday && this.toDatePayday) {
            result = result && this.formatDate(row.payday) >= this.formatDate(this.fromDatePayday) &&
              this.formatDate(row.payday) <= this.formatDate(this.toDatePayday);
          } else if (this.paid != null) {
              if(this.paid === 'Da'){
                result = result && row.datePaid != null;
              } else{
                result = result && row.datePaid == null;
              }
          } else if (this.fromDatePaid && this.toDatePaid) {
            result = result && this.formatDate(row.datePaid) >= this.formatDate(this.fromDatePaid) &&
              this.formatDate(row.datePaid) <= this.formatDate(this.toDatePaid);
          }
          return result;
        };
      });
    });
  }

  refreshTable() {
    this.billService.getAll(this.type).subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  isPaid(datePaid: Date): string {
    if (datePaid != null) { return 'Da'; }
    else { return 'Ne'; }
  }

  delete(detail: Bill): void {
    this.billService.deleteBill(detail.identificator, this.type).subscribe((data) => {
      this.refreshTable();
    });
  }

  update(detail: Bill): void {
    this.dataService.bill = detail;
    this.dataService.bill.type = this.type;
    this.router.navigate(['bill'], { queryParams: { action: 'edit' } });
  }

  applyFilter() {
    this.dataSource.filter = '' + Math.random();
  }

  private formatDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
