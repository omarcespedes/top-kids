import { KidService, Kid, KidContact, Parent } from './kid.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


@Component({
    moduleId: module.id,
    selector: 'kid-detail',
    templateUrl: './kid-detail.component.html',
    providers: [KidService],
    styleUrls: ['../main/container-section.scss']
})
export class KidDetailComponent implements OnInit {
    @ViewChild('kidPhoto') kidPhoto: ElementRef;

    kid: Kid = new Kid();
    maxDate: Date = new Date();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private kidService: KidService
        ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            if (+params['id']) {
                this.kidService.getOne(+params['id']).then(kid => {
                    kid.birthDate = new Date(kid.birthDate);
                    kid.startDate = kid.startDate ? new Date(kid.startDate) : null;

                    if (kid.parents.length) {
                      kid.parents.forEach(parent => {
                        parent.birthDate = new Date(parent.birthDate);
                      });
                    }

                    kid = kid as Kid;
                    if (kid.parents.length === 1) {
                        kid.parents.push(new Parent());
                    } else if (!kid.parents.length) {
                      kid.parents.push(new Parent(), new Parent());
                    }
                    this.kid = kid;
                });
            } else {
                this.kid.active = true;
                this.kid.parents = [new Parent(), new Parent()];
            }
        })
     }

     onSubmitKid(){
         const action = this.kid.id? 'update' : 'create';
         this.kidService[action](this.kid).then((kid) => {
             if(action === 'create'){
                 this.kid.id = kid.id;
             }
            const input = this.kidPhoto.nativeElement;
            if(input.files.length){
                let formData = new FormData();
                formData.append('avatar', input.files.item(0));
                this.kidService.uploadPhoto(this.kid.id, formData).then(() => {
                    this.router.navigate(['kids']);
                });
            } else {
                this.router.navigate(['kids']);
            }
         })
     }

     addContact(){
         this.kid.kidContacts = this.kid.kidContacts || [];
         this.kid.kidContacts.push(new KidContact())
     }
}
