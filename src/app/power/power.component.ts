import {Component, OnInit, ViewChild} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {Power} from './power';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {BillService} from '../_services/bill.service';

@Component({
  selector: 'app-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.scss']
})
export class PowerComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayColumns = ['payday', 'paid', 'datePaid', 'cost', 'counter', 'action'];
  dataSource: MatTableDataSource<Power>;
  type = 'power';

  constructor(private billService: BillService, private router: Router) { }

  ngOnInit(): void {
    this.billService.getAll(this.type).subscribe((data) => {
      this.dataSource = new MatTableDataSource<Power>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(data);
    });
  }

  refreshTable() {
    this.billService.getAll(this.type).subscribe((data) => {
      this.dataSource.data = data;
      console.log(data);
    });
  }

  isPaid(datePaid: Date): string {
    if (datePaid != null) { return 'Da'; }
    else { return 'Ne'; }
  }

  delete(power: Power): void {
    this.billService.deleteBill(power.identificator, this.type).subscribe((data) => {
      console.log(data);
      this.refreshTable();
    });
  }

  update(power: Power): void{
    this.billService.updateBill(power, this.type).subscribe((data) => {
      console.log(data);
      this.refreshTable();
    });
  }
}
