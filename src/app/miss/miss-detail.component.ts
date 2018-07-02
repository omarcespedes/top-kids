import { Group, GroupService } from './../groups/group.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Miss, MissService } from './miss.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from 'app/main/user.service';

@Component({
    moduleId: module.id,
    selector: 'miss-detail',
    templateUrl: './miss-detail.component.html',
    styleUrls: ['../main/container-section.scss']
})

export class MissDetailComponent implements OnInit {
    miss: Miss = new Miss();
    groups: Group[];
    maxDate: Date = new Date();
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private missService: MissService,
        private groupService: GroupService,
        public userService: UserService
    ) { }

    ngOnInit() {
        const promises = [
            this.groupService.getAll()
        ];
        this.route.params.subscribe((params: Params) => {
            if (+params['id']) {
                promises.push(
                    this.missService.getOne(+params['id']).then(miss => {
                        miss.birthDate = new Date(miss.birthDate);
                        this.miss = miss;
                    })
                );
            }
        });

        Observable.forkJoin(promises).subscribe(results => {
            const [groups]  = results;
            this.groups = groups as Group[];
        });
     }

     onSubmitMiss() {
         const action = this.miss.id ? 'update' : 'create';
         this.missService[action](this.miss).then(response => {
            this.router.navigate(['/misses']);
         });
     }
}
