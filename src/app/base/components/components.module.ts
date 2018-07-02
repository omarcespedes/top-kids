import { ConfirmPaymentDialog } from './dialog/confirm-payment.component';
import { DeleteDialog } from './dialog/dialog-delete.component';
import { MailDialog } from './dialog/dialog-mail.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material.module';
import { TwoListSelectorComponent } from './two-list-selector.component';
import { NgModule } from '@angular/core';
import { TinyEditorComponent } from 'app/base/components/tiny-mce/tiny-mce.component';

@NgModule({
    imports: [
        MaterialModule,
        FlexLayoutModule,
        CommonModule
    ],
    exports: [
        TwoListSelectorComponent,
        MailDialog,
        DeleteDialog,
        ConfirmPaymentDialog,
        TinyEditorComponent
    ],
    declarations: [
        TwoListSelectorComponent,
        MailDialog,
        DeleteDialog,
        ConfirmPaymentDialog,
        TinyEditorComponent
    ],
    providers: [],
})
export class ComponentsModule { }
