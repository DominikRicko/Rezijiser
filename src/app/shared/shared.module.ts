import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent, HeaderComponent, NavigationComponent, PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, NavigationComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, TranslateModule, FormsModule, AppRoutingModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, NavigationComponent, HeaderComponent, FooterComponent]
})
export class SharedModule {}
