import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {BillService} from '../_services/bill.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../_services/data.service';
import {Bill} from '../bill/bill';

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

  constructor(
    private billService: BillService,
    private route: ActivatedRoute,
    public dataService: DataService,
    private router: Router
  ) { }

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
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

}
