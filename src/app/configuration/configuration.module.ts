import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';

import { ConfigurationComponent } from './configuration.component';

@NgModule({
  imports: [
    MaterialModule,
    FormsModule,
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [
    ConfigurationComponent
  ]
})
export class ConfigurationModule { }
