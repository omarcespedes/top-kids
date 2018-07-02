import { BaseService } from './../base/base.service';
import { Http } from '@angular/http';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export class MissService extends BaseService {

    constructor(
        injector: Injector
    ) {
        super(injector);
        this.baseUrl = '/api/miss';
    }

    updateSalaries(newMissSalaries: any[]): Promise<any> {
      return this.http.post(`${this.baseUrl}/updateSalaries`, newMissSalaries)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }
}


export class Miss {
    constructor(
        public id?: number,
        public name?: string,
        public lastName?: string,
        public surName?: string,
        public birthDate?: Date,
        public startDate?: Date,
        public cellphone?: number,
        public email?: string,
        public ci?: string,
        public bonusPayDate?: Date,
        public groupId?: number,
        public salary?: number,
        public oldBond?: number
    ) {}
}
