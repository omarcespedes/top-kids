import { ConfirmPaymentDialog } from './components/dialog/confirm-payment.component';
import { DeleteDialog } from './components/dialog/dialog-delete.component';
import { MailDialog } from './components/dialog/dialog-mail.component';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DialogService {

    constructor(
        private dialog: MatDialog
    ) { }

    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MatDialogRef<MailDialog>;

        dialogRef = this.dialog.open(MailDialog);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }

    public delete(entity: string) {
        let dialogRef: MatDialogRef<DeleteDialog>;

        dialogRef = this.dialog.open(DeleteDialog);
        dialogRef.componentInstance.title = 'Eliminar';
        dialogRef.componentInstance.message = `Esta seguro de borrar ${entity}?. Esta accion no puede ser revertida.`;

        return dialogRef.afterClosed();
    }

    public updatePayment() {
      let dialogRef: MatDialogRef<ConfirmPaymentDialog>;

        dialogRef = this.dialog.open(ConfirmPaymentDialog);
        dialogRef.componentInstance.title = 'Actualizar Valores';
        dialogRef.componentInstance.message = `Esta seguro de actualizar los valores de las misses?
        El salario pasado se actualizara con el nuevo.`;

        return dialogRef.afterClosed();
    }
}
