import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {TrashComponent} from './trash.component';
import {TrashRoutingModule} from './trash-routing.module';

@NgModule({
  declarations: [TrashComponent],
  imports: [CommonModule, SharedModule, TrashRoutingModule, ReactiveFormsModule]
})
export class TrashModule {}
