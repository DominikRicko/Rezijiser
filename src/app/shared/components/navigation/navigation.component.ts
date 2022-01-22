import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../_services/token-storage.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  type: string;

  constructor(
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.type = params.type;
    });
  }

  signOut() {
    this.snackBar.open('Uspješno odjavljeni.', null, {duration: 5000});
    this.tokenStorage.signOut();
  }
}
