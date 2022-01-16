import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {BillService} from '../_services/bill.service';
import {Router} from '@angular/router';
import {Communal} from './communal';

@Component({
  selector: 'app-communal',
  templateUrl: './communal.component.html',
  styleUrls: ['./communal.component.scss']
})
export class CommunalComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayColumns = ['payday', 'paid', 'datePaid', 'cost', 'action'];
  dataSource: MatTableDataSource<Communal>;
  type = 'communal';

  constructor(private billService: BillService, private router: Router) { }

  ngOnInit(): void {
    this.billService.getAll(this.type).subscribe((data) => {
      this.dataSource = new MatTableDataSource<Communal>(data);
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

  delete(communal: Communal): void {
    this.billService.deleteBill(communal.identificator, this.type).subscribe((data) => {
      console.log(data);
      this.refreshTable();
    });
  }

  update(communal: Communal): void{
    this.billService.updateBill(communal, this.type).subscribe((data) => {
      console.log(data);
      this.refreshTable();
    });
  }

}
