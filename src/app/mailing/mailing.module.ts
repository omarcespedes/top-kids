import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MailingFormComponent } from './mailing-form.component';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'app/base/components/components.module';



@NgModule({
    imports: [
      CommonModule,
      MaterialModule,
      FormsModule,
      ComponentsModule
    ],
    exports: [MailingFormComponent],
    declarations: [MailingFormComponent],
    providers: [],
})
export class MailingModule { }
