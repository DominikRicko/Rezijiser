import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {BillService} from '../_services/bill.service';
import {Router} from '@angular/router';
import {Telecommunication} from './telecommunication';

@Component({
  selector: 'app-telecommunication',
  templateUrl: './telecommunication.component.html',
  styleUrls: ['./telecommunication.component.scss']
})
export class TelecommunicationComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayColumns = ['payday', 'paid', 'datePaid', 'cost', 'action'];
  dataSource: MatTableDataSource<Telecommunication>;
  type = 'telecom';

  constructor(private billService: BillService, private router: Router) { }

  ngOnInit(): void {
    this.billService.getAll(this.type).subscribe((data) => {
      this.dataSource = new MatTableDataSource<Telecommunication>(data);
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

  delete(telecommunication: Telecommunication): void {
    this.billService.deleteBill(telecommunication.identificator, this.type).subscribe((data) => {
      console.log(data);
      this.refreshTable();
    });
  }

  update(telecommunication: Telecommunication): void{
    this.billService.updateBill(telecommunication, this.type).subscribe((data) => {
      console.log(data);
      this.refreshTable();
    });
  }

}
