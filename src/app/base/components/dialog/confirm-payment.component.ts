import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'mail-dialog',
    template: `
    <p>{{title}}</p>
    <p>{{message}}</p>
    <button type="button" mat-raised-button (click)="dialogRef.close(true)">Actualizar</button>
    <button type="button" mat-raised-button (click)="dialogRef.close()">Cancelar</button>
    `
})

export class ConfirmPaymentDialog {
    title: string;
    message: string;
    constructor(
        public dialogRef: MatDialogRef<ConfirmPaymentDialog>
    ) { }
}
