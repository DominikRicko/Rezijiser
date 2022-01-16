import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {BillService} from '../_services/bill.service';
import {Router} from '@angular/router';
import {Reservation} from './reservation';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayColumns = ['payday', 'paid', 'datePaid', 'cost', 'action'];
  dataSource: MatTableDataSource<Reservation>;
  type = 'reservation';

  constructor(private billService: BillService, private router: Router) { }

  ngOnInit(): void {
    this.billService.getAll(this.type).subscribe((data) => {
      this.dataSource = new MatTableDataSource<Reservation>(data);
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

  delete(reservation: Reservation): void {
    this.billService.deleteBill(reservation.identificator, this.type).subscribe((data) => {
      console.log(data);
      this.refreshTable();
    });
  }

  update(reservation: Reservation): void{
    this.billService.updateBill(reservation, this.type).subscribe((data) => {
      console.log(data);
      this.refreshTable();
    });
  }

}
