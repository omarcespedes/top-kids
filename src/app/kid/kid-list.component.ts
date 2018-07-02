import { DialogService } from './../base/dialog.service';
import { Kid, KidService } from './kid.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'kid-list',
    templateUrl: './kid-list.component.html',
    providers: [
        KidService,
        DialogService
    ],
    styleUrls: [
        './kid-list.component.scss',
        '../main/container-section.scss'
    ]
})
export class KidListComponent implements OnInit {
    public kidList: Kid[];
    includeInactive = false;

    constructor(
        private router: Router,
        private kidService: KidService,
        private dialogService: DialogService
    ) { }

    ngOnInit() {
        this.getAllKids();
    }

     onEditKid(kid: Kid) {
        this.router.navigate(['/kidDetail', kid.id])
     }

     onPayKid(kid: Kid) {
         this.router.navigate(['/kidPayment', kid.id])
     }

     routeToNewKid() {
         this.router.navigate(['/kidDetail', 0]);
     }

     onDeleteKid(kid: Kid) {
        this.dialogService.delete('al niño')
        .subscribe(yes => {
            if (yes) {
                this.kidService.delete(kid.id).then(response => {
                    if (response.success) {
                        this.getAllKids();
                    }
                });
            }
        });
     }

     private getAllKids() {
        const include = this.includeInactive ? 'T' : 'F';
        this.kidService.getAllKids(include).then(response => {
            response = response as Kid[];
            this.kidList = response;
        });
     }

     getProfilePicture(kid: Kid) {
        if ( kid.imageUrl ) {
            return `uploads/_${kid.id}_avatar.png`;
        }

        return 'uploads/default.jpg';
     }

     onInactiveChange(checkboxEvent) {
        this.getAllKids();
     }
}
