import { Kid } from './kid.service';
import { BaseService } from './../base/base.service';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export class KidPaymentService extends BaseService {

    constructor(injector: Injector) {
        super(injector);
        this.baseUrl = '/api/kidPayment';
     }

     create(kidPaymentData: KidPayment) {
        kidPaymentData.issuedDate = new Date(kidPaymentData.year, kidPaymentData.month, 1);
        kidPaymentData.paymentDate = new Date();

        delete kidPaymentData.year;
        delete kidPaymentData.month;

        return super.create(kidPaymentData);
     }

     getPaymentsForKid(kidId) {
         return this.http.get(`${this.baseUrl}/get/kid/${kidId}`)
            .toPromise()
            .then(response => response.json() as KidPayment[])
            .catch(this.handleError);
     }

     getMonths() {
        return [{
            label: 'Enero',
            value: 0
        }, {
            label: 'Febrero',
            value: 1
        }, {
            label: 'Marzo',
            value: 2
        }, {
            label: 'Abril',
            value: 3
        }, {
            label: 'Mayo',
            value: 4
        }, {
            label: 'Junio',
            value: 5
        }, {
            label: 'Julio',
            value: 6
        }, {
            label: 'Agosto',
            value: 7
        }, {
            label: 'Septiembre',
            value: 8
        }, {
            label: 'Octubre',
            value: 9
        }, {
            label: 'Noviembre',
            value: 10
        }, {
            label: 'Diciembre',
            value: 11
        }];
    }

    getYears(start: number, limit: number): number[]{
        const years = [];
        for (let i = 0; i < limit; i++) {
            years.push(start + i);
        }

        return years;
    }

    getYearRange() {
        const currentYear = new Date().getFullYear();

        return [{
            year: currentYear - 1,
        }, {
            year: currentYear
        }, {
            year: currentYear + 1
        }];
    }
}

export class KidPayment {
    constructor(
        public id?: number,
        public paymentDate?: Date,
        public issuedDate?: Date,
        public amount?: number,
        public kid?: Kid,
        public year?: number,
        public month?: number,
        public type?: string
    ) {}
}
