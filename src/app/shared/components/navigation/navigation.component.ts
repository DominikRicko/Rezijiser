import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../_services/token-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    console.log('NavigationComponent INIT');
  }

  signOut() {
    this.tokenStorage.signOut();
  }
}
