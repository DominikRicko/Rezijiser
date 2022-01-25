import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedModule, LoginRoutingModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule]
})
export class LoginModule {
}
