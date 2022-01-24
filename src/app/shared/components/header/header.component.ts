import {Component, OnInit} from '@angular/core';
import {BillComponent} from '../../../bill/bill.component';
import {TokenStorageService} from '../../../_services/token-storage.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: any = {};

  constructor(
    private tokenStorage: TokenStorageService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
  }

  public openAddBillDialog(): void {
    const dialogRef = this.dialog.open(BillComponent, {
      data: false
    });
  }
}
