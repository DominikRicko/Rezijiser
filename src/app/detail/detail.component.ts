import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {BillService} from '../_services/bill.service';
import {ActivatedRoute} from '@angular/router';
import {Detail} from './detail';

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
  dataSource: MatTableDataSource<Detail>;
  type: string;

  constructor(private billService: BillService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.type = params.type;
      if (!this.counterType.includes(this.type)) {
        this.displayColumns = ['payday', 'paid', 'datePaid', 'cost', 'action'];
      } else {
        this.displayColumns = ['payday', 'paid', 'datePaid', 'cost', 'counter', 'action'];
      }
      this.billService.getAll(this.type).subscribe((data) => {
        this.dataSource = new MatTableDataSource<Detail>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(data);
      });
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

  delete(detail: Detail): void {
    this.billService.deleteBill(detail.identificator, this.type).subscribe((data) => {
      console.log(data);
      this.refreshTable();
    });
  }

  update(detail: Detail): void{
    this.billService.updateBill(detail, this.type).subscribe((data) => {
      console.log(data);
      this.refreshTable();
    });
  }

}
