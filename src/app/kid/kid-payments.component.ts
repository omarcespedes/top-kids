import { Observable } from 'rxjs/Rx';
import { KidService, Kid } from './kid.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { KidPayment, KidPaymentService } from './kid-payment.service';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'kid-payment',
    templateUrl: './kid-payments.component.html',
    providers: [
        KidPaymentService,
        KidService
    ],
    styleUrls: [
        './kid-payments.component.scss',
        '../main/container-section.scss',
        '../main/table.scss'
    ]
})

export class KidPaymentsComponent implements OnInit {
    kid: Kid = new Kid();
    years: Object[];
    months: Object[];
    kidPayment: KidPayment = new KidPayment();
    kidPayments: KidPayment[] = [];

    constructor(
        private kidPaymentService: KidPaymentService,
        private route: ActivatedRoute,
        private router: Router,
        private kidService: KidService
    ) {

     }

    ngOnInit() {
        this.years = this.kidPaymentService.getYearRange();
        this.months = this.kidPaymentService.getMonths();
        this.kidPayment.year = new Date().getFullYear();
        this.kidPayment.type = 'month';

        this.route.params.subscribe((params: Params) => {
            const kidId = +params['id'];
            if (kidId) {
                Observable.forkJoin([
                    this.kidService.getOne(kidId),
                    this.kidPaymentService.getPaymentsForKid(kidId)
                ]).subscribe(response => {
                    let [kid, kidPayments] = response;
                    kid = kid as Kid;
                    this.kid = kid;
                    this.kidPayment.kid = kid;
                    this.kidPayment.amount = kid.monthlyPayment;
                    this.preProcessPayments(kidPayments);
                });
            }
        });
     }

     private preProcessPayments(kidPayments) {
        let yearPayments = [];
        let years = new Set();
        kidPayments.forEach(payment => {
            payment.issuedDate = new Date(payment.issuedDate);
            years.add(payment.issuedDate.getFullYear());
        });
        years.forEach((year) => {
            yearPayments.push({
                year,
                months: generateYear(year),
                monthTotals: []
            });
        });

        kidPayments.forEach(payment => {
            payment.paymentDate = new Date(payment.paymentDate);
            const year = payment.issuedDate.getFullYear();
            const month = payment.issuedDate.getMonth();
            for (let i = 0; i < yearPayments.length; i++) {
                const yearPayment = yearPayments[i];
                const sameYear = yearPayment.year === year;
                if (payment.type === 'material' && sameYear) {
                    yearPayment.material = true;
                } else if (sameYear) {
                    yearPayment.months[month].payments.push(payment);
                    yearPayment.monthTotals[month] = (yearPayment.monthTotals[month] || 0) + payment.amount;
                }
            }
        });

        this.kidPayments = yearPayments;

        function generateYear(year: number) {
            const months = [];
            for (let i = 0 ; i < 12; i++) {
                months.push({
                    paid: false,
                    payments: []
                });
            }
            return months;
        }
     }

    onSubmitPayment() {
        this.kidPaymentService.create(this.kidPayment).then(() => {
            this.router.navigate(['/kids']);
        });
    }
}
