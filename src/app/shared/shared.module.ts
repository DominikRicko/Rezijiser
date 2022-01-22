import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent, HeaderComponent, NavigationComponent, PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import {NotificationComponent} from './components/header/notification/notification.component';
import {MatCardModule} from '@angular/material/card';
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, NavigationComponent, HeaderComponent, FooterComponent, NotificationComponent],
  imports: [CommonModule, TranslateModule, FormsModule, AppRoutingModule, MatDialogModule, MatCardModule, NgbDropdownModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, NavigationComponent, HeaderComponent, FooterComponent]
})
export class SharedModule {}
