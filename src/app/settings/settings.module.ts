import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SettingsComponent} from './settings.component';
import {SettingsRoutingModule} from './settings-routing.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, SharedModule, SettingsRoutingModule, ReactiveFormsModule]
})
export class SettingsModule {}
