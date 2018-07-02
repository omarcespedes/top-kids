import { DialogService } from './../base/dialog.service';
import { Router } from '@angular/router';
import { Miss, MissService } from './miss.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/main/user.service';

@Component({
    moduleId: module.id,
    selector: 'miss-list',
    templateUrl: './miss-list.component.html',
    styleUrls: [
        './miss-list.component.scss',
        '../main/container-section.scss'
    ],
    providers: [
        DialogService
    ]
})

export class MissListComponent implements OnInit {
    public misses: Miss[];
    constructor(
        private router: Router,
        private missService: MissService,
        private dialogService: DialogService,
        public userService: UserService
    ) { }

    ngOnInit() {
        this.getAllMisses();
    }

    onEditMiss(miss: Miss) {
      this.router.navigate(['/missDetail', miss.id]);
    }

     onDeleteMiss(miss: Miss) {
        this.dialogService.delete('una miss')
        .subscribe(yes => {
            if (yes) {
              this.missService.delete(miss.id).then(response => {
                if (response.success) {
                  this.getAllMisses();
                }
              });
            }
        });
     }

     routeToNewMiss() {
         this.router.navigate(['/missDetail', 0]);
     }

     routeToMissPayment() {
      this.router.navigate(['/missPayment']);
     }

     private getAllMisses() {
        this.missService.getAll().then(misses => {
            misses = misses as Miss[];
            this.misses = misses;
        });
     }
}
