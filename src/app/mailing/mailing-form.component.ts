import { DialogService } from './../base/dialog.service';
import { Observable } from 'rxjs/Rx';
import { MailService } from './mailing.service';
import { KidService, Kid } from './../kid/kid.service';
import { GroupService, Group } from './../groups/group.service';
import { Component, OnInit } from '@angular/core';

export declare var tinymce;

@Component({
    moduleId: module.id,
    templateUrl: './mailing-form.component.html',
    styleUrls: [
        './mailing-form.component.scss',
        '../main/container-section.scss'
    ],
    providers: [
        KidService,
        GroupService,
        MailService,
        DialogService
    ]
})
export class MailingFormComponent implements OnInit {

    public filter: any;
    public content: string;
    public subject: string;
    public enableSend = true;

    public kids: Kid[];
    public groups: Group[];

    constructor(
        private groupService: GroupService,
        private kidService: KidService,
        private mailService: MailService,
        private dialogService: DialogService
    ) {
        this.filter = {};
    }

    ngOnInit() {
        Observable.forkJoin(
            this.groupService.getAll(),
            this.kidService.getAll()
        ).subscribe(response => {
            let [groups, kids] = response;
            this.groups = groups;
            this.kids = kids;
        });
     }

     onAudienceChange(value) {
         if (value === 'all') {
             delete this.filter.group;
             delete this.filter.kid;
         } else if (value === 'kid') {
            delete this.filter.group;
         } else if (value === 'group') {
            delete this.filter.kid;
         }
     }

    onSubmitEmails() {
        let payload = {
            mailOptions: {
                content: tinymce.activeEditor.getContent(),
                subject: this.subject
            },
            filter: this.filter
        };

        this.enableSend = false;
        this.mailService.sendEmails(payload).then(response => {
            if (response.success) {
                if (response.emails.rejected.length) {
                    this.dialogService.confirm(
                        'Atencion',
                        'No se pudieron enviar los mails a los siguientes destinatarios:\n' + response.emails.rejected.join());
                } else {
                    this.dialogService.confirm(
                        'Enviado',
                        'Todos los emails fueron enviados satisfactoriamente');
                }
            }
            this.enableSend = true;
        }).catch(response => {
            response = response.json();
            this.dialogService.confirm('Error', response.message);
            this.enableSend = true;
        });
    }
}
