import { Miss } from './../miss/miss.service';
import { Kid } from './../kid/kid.service';
import { BaseService } from './../base/base.service';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export class GroupService extends BaseService {
    baseUrl = '/api/group';
    constructor(public injector: Injector) {
        super(injector);
     }

     update(group: Group): Promise<any> {
        let kids = group.kids;
        if (kids && kids.length) {
            for (let i = 0 ; i < kids.length; i++) {
                kids[i] = kids[i].id;
            }
        }
        return super.update(group);
     }
}

export class Group {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public kids?: any[],
        public miss?: Miss
    ) { }
}
