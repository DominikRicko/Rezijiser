import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {BillService} from '../_services/bill.service';
import {Router} from '@angular/router';
import {Hrt} from './hrt';

@Component({
  selector: 'app-hrt',
  templateUrl: './hrt.component.html',
  styleUrls: ['./hrt.component.scss']
})
export class HrtComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayColumns = ['payday', 'paid', 'datePaid', 'cost', 'action'];
  dataSource: MatTableDataSource<Hrt>;
  type = 'hrt';

  constructor(private billService: BillService, private router: Router) { }

  ngOnInit(): void {
    this.billService.getAll(this.type).subscribe((data) => {
      this.dataSource = new MatTableDataSource<Hrt>(data);
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

  delete(hrt: Hrt): void {
    this.billService.deleteBill(hrt.identificator, this.type).subscribe((data) => {
      console.log(data);
      this.refreshTable();
    });
  }

  update(hrt: Hrt): void{
    this.billService.updateBill(hrt, this.type).subscribe((data) => {
      console.log(data);
      this.refreshTable();
    });
  }

}
