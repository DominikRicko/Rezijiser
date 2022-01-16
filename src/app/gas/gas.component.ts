import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Power} from "../power/power";
import {BillService} from "../_services/bill.service";
import {Router} from "@angular/router";
import {Gas} from "./gas";

@Component({
  selector: 'app-gas',
  templateUrl: './gas.component.html',
  styleUrls: ['./gas.component.scss']
})
export class GasComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayColumns = ['payday', 'paid', 'datePaid', 'cost', 'counter', 'action'];
  dataSource: MatTableDataSource<Gas>;
  type = 'gas';

  constructor(private billService: BillService, private router: Router) { }

  ngOnInit(): void {
    this.billService.getAll(this.type).subscribe((data) => {
      this.dataSource = new MatTableDataSource<Gas>(data);
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

  delete(gas: Gas): void {
    this.billService.deleteBill(gas.identificator, this.type).subscribe((data) => {
      console.log(data);
      this.refreshTable();
    });
  }

  update(gas: Gas): void{
    this.billService.updateBill(gas, this.type).subscribe((data) => {
      console.log(data);
      this.refreshTable();
    });
  }

}
