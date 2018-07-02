import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";

@Component({
    moduleId: module.id,
    selector: 'mail-dialog',
    template: `
    <p>{{title}}</p>
    <p>{{message}}</p>
    <button type="button" mat-raised-button (click)="dialogRef.close(true)">Eliminar</button>
    <button type="button" mat-raised-button (click)="dialogRef.close()">Cancel</button>
    `
})

export class DeleteDialog implements OnInit {
    title: string;
    message: string;
    constructor(
        public dialogRef: MatDialogRef<DeleteDialog>
    ) { }

    ngOnInit() { }
}
