import { TwoListSelectorComponent } from './../base/components/two-list-selector.component';
import { Observable } from 'rxjs/Rx';
import { KidService, Kid } from './../kid/kid.service';
import { Router } from '@angular/router';
import { Group, GroupService } from './group.service';
import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'group-list',
    templateUrl: './group-list.component.html',
    providers: [
        GroupService,
        KidService
    ],
    styleUrls: [
        './group-list.component.scss',
        '../main/container-section.scss'
    ]
})

export class GroupListComponent implements OnInit {
    groups: Group[];
    availableKids: Kid[] = [];
    groupKids: Kid[] = [];

    @ViewChildren(TwoListSelectorComponent) twoLists: QueryList<TwoListSelectorComponent>;

    constructor(
        private groupService: GroupService,
        private router: Router,
        private kidService: KidService ,
    ) { }

    ngOnInit() {
        this.loadGroupKids();
    }

    routeToNewGroup() {
        this.router.navigate(['/group', 0]);
    }

     onTabChange(event) {
         const currentTab = event.tab;
         const groupId = this.groups[currentTab.position].id;
         this.kidService.getByGroup(groupId).then(kids => {
            this.groupKids = kids as Kid[];
         });
     }

     updateGroup(group) {
         group.kids = this.getTwoListInstance(group.name).getSelectedItems();
         this.groupService.update(group).then((response) => {
            this.loadGroupKids();
         });
     }

     private loadGroupKids() {
        Observable.forkJoin([
            this.groupService.getAll(),
            this.kidService.getAvailableKids()
        ]).subscribe(response => {
            const [groups, kids] = response;
            groups.forEach(group => {
                group.kids = this.transformData(group.kids);
            });
            this.groups = groups;
            this.availableKids = this.transformData(kids);
        });
     }

     private transformData(kids = []): any[] {
        return kids.map(kid => {
            return {
                displayValue: `${kid.name} ${kid.lastName} ${kid.surName || ''}`,
                value: kid
            };
        });
     }

     private getTwoListInstance(groupName: string): TwoListSelectorComponent {
        return this.twoLists.find(twoList => twoList.name === groupName);
     }
}
