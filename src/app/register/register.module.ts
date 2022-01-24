import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule]
})
export class RegisterModule {}
