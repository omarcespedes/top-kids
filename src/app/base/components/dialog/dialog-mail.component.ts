import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";

@Component({
    moduleId: module.id,
    selector: 'mail-dialog',
    template: `
    <p>{{title}}</p>
    <p>{{message}}</p>
    <button type="button" mat-raised-button (click)="dialogRef.close()">Ok</button>
    `
})

export class MailDialog implements OnInit {
    title: string;
    message: string;
    constructor(
        public dialogRef: MatDialogRef<MailDialog>
    ) { }

    ngOnInit() { }
}
