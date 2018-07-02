import { KidService, Kid } from './../kid/kid.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Group, GroupService } from './group.service';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'group-detail',
    templateUrl: './group-detail.component.html',
    providers: [
        GroupService
    ],
    styleUrls: ['../main/container-section.scss']
})

export class GroupDetailComponent implements OnInit {

    group: Group = new Group()

    constructor(
        private route: ActivatedRoute,
        private groupService: GroupService,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            console.log(params);
            if(+params['id']){
                this.groupService.getOne(+params['id']).then(response => 
                console.log(response))
            }
        })
     }

     onSubmitGroup(){
         this.groupService.create(this.group).then(response => {
            console.log(response);
            this.router.navigate(['groups'])
         })
     }
}