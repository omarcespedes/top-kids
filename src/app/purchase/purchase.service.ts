import { BaseService } from './../base/base.service';
import { Injectable, Injector } from '@angular/core';
import { URLSearchParams} from '@angular/http';
import { UserService } from 'app/main/user.service';

@Injectable()
export class PurchaseService extends BaseService {

    constructor(
        private injector: Injector,
        private userService: UserService
    ) {
        super(injector);
        this.baseUrl = '/api/purchase';
    }

    getPurchasesForMonth(date: Date, type: string) {
        return this.http.post(`${this.baseUrl}/getForMonth`, {
            date,
            type
        })
            .toPromise()
            .then(purchases => purchases.json())
            .catch(this.handleError(this));
    }

    getUniqueNames(type: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('type', type);

        return this.http.get(`${this.baseUrl}/getUniqueItems`, {
            search: params
        })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError(this));
    }

    delete(entityId: number) {
        const params: URLSearchParams = new URLSearchParams();
        params.set('username', this.userService.getUser().username);

        return this.http.delete(`${this.baseUrl}/${entityId}`, {
            search: params
        })
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError(this));
    }
}

export class Purchase {
    constructor(
        public id?: number,
        public itemName?: string,
        public quantity?: number,
        public purchaseDate?: Date,
        public unitPrice?: number,
        public type?: string,
        public place?: string
    ) {}
}
