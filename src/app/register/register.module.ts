import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule]
})
export class RegisterModule {}
