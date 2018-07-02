import { BaseService } from './../base/base.service';
import { Injectable, Injector } from '@angular/core';
import { URLSearchParams} from '@angular/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class KidService extends BaseService {
    constructor(
        injector: Injector
    ) {
        super(injector);
        this.baseUrl = '/api/kid';
    }

    getAllKids(active: string) {
        const params = new URLSearchParams();
        params.set('active', active);

        return this.http.get(this.baseUrl, {
            search: params
        })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError(this));
    }

    getAvailableKids() {
        return this.http.get(`${this.baseUrl}/getAvailable`)
            .toPromise()
            .then(response => response.json() as Kid[])
            .catch(this.handleError(this));
    }

    getByGroup(groupId){
        return this.http.get(`${this.baseUrl}/group/${groupId}`)
            .toPromise()
            .then(response => response.json() as Kid[])
            .catch(this.handleError(this));
    }

    uploadPhoto(kidId: number, data: any){
        return this.http.post(`${this.baseUrl}/uploadPhoto/${kidId}`, data)
            .toPromise();
    }
}


export class Kid {
    constructor(
        public id?: number,
        public name?: string,
        public lastName?: string,
        public surName?: string,
        public birthDate?: Date,
        public address?: string,
        public allergies?: string,
        public siblings?: string,
        public authorizedToPickUp?: string,
        public startDate?: Date,
        public invoiceName?: string,
        public invoiceNIT?: string,
        public monthlyPayment?: number,
        public active?: boolean,
        public parents?: Parent[],
        public kidContacts?: KidContact[],
        public imageUrl?: String
    ) { }
}

export class Parent {
    constructor(
        public id?: number,
        public name?: string,
        public lastName?: string,
        public surName?: string,
        public birthDate?: Date,
        public employment?: string,
        public workPhone?: string,
        public cellPhone?: string,
        public email?: string,
        public type?: string
    ) {}
}

export class KidContact {
    constructor(
        public id?: number,
        public name?: string,
        public phone?: string,
        public relationship?: string
    ) {}
}
