import { ActivatedRoute, Params } from '@angular/router';
import { KidPaymentService } from './../kid/kid-payment.service';
import { Observable } from 'rxjs/Observable';
import { PurchaseService, Purchase } from './purchase.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DialogService } from 'app/base/dialog.service';

@Component({
    moduleId: module.id,
    selector: 'purchase-form',
    templateUrl: './purchase-form.component.html',
    providers: [
        PurchaseService,
        KidPaymentService,
        DialogService
    ],
    styleUrls: [
        '../main/container-section.scss',
        '../main/table.scss'
    ]
})

export class PurchaseFormComponent implements OnInit {
    itemNameCtrl: FormControl;
    purchase: Purchase = new Purchase();
    purchases: Purchase[];
    itemNames: string[];
    filteredNames: any;
    months: any[];
    years: number[];
    filter: any;
    type: string;
    typeName: string;
    totalCost: number;
    maxDate: Date = new Date();

    @ViewChild('purchaseForm') purchaseForm;

    constructor(
        private purchaseService: PurchaseService,
        private kidPaymentService: KidPaymentService,
        private route: ActivatedRoute,
        private dialogService: DialogService
    ) {
        const now = new Date();
        this.filter = {
            year: now.getFullYear(),
            month: now.getMonth()
        };
        this.months = this.kidPaymentService.getMonths();
        this.years = this.kidPaymentService.getYears(2017, 6);
        this.itemNameCtrl = new FormControl();
        this.filteredNames = this.itemNameCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterNames(name));
        this.itemNameCtrl.valueChanges.subscribe(value => {
            this.purchase.itemName = value;
        });
        this.maxDate.setDate(this.maxDate.getDate());
     }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            const type = params['type'];
            if (type) {
                this.type = type;
                this.typeName = type === 'kitchen' ? 'Cocina' : 'Material';
                this.getPurchaseData(true, type);
                this.clearForm();
            }
        });
    }

    onSubmitPurchase() {
        this.purchase.type = this.type;
        this.purchaseService.create(this.purchase).then((purchase) => {
            const today = new Date();
            const purchaseDate = new Date(this.purchase.purchaseDate);
            this.clearForm();
            this.getPurchaseData(
                purchaseDate.getMonth() === this.filter.month &&
                purchaseDate.getFullYear() === this.filter.year,
                this.type,
                purchaseDate);
        });
    }

    private getPurchaseData(includeMonth: boolean, type: string, date?: Date) {
        const promises = [
            this.purchaseService.getUniqueNames(type)
        ];

        if (includeMonth) {
            promises.push(this.getMonthPurchases(date));
        }
        Observable.forkJoin(promises).subscribe(response => {
            const [itemNames] = response;
            this.itemNames = itemNames;
        });
    }

    private getMonthPurchases(filterDate: Date = new Date()) {
        return this.purchaseService.getPurchasesForMonth(filterDate, this.type).then((purchases) => {
            this.purchases = purchases;
            this.totalCost = 0;
            purchases.forEach(purchase => {
                this.totalCost += (purchase.quantity * (purchase.unitPrice || 0));
            });
        });
    }

    filterNames(name: string) {
        return name ? this.itemNames.filter(s => new RegExp(`^${name}`, 'gi').test(s))
               : this.itemNames;
    }

    onFilterPurchases() {
        const filterDate = new Date(this.filter.year, this.filter.month, 1);
        this.getMonthPurchases(filterDate);
    }

    onRemovePurchase(purchase: Purchase) {
        this.dialogService.delete('esta compra').subscribe(yes => {
            if (yes) {
                this.purchaseService.delete(purchase.id).then(() => {
                    this.onFilterPurchases();
                });
            }
        });
    }

    private clearForm() {
        this.purchaseForm.resetForm();
        this.itemNameCtrl.setValue('');
        this.itemNameCtrl.setErrors(null);
    }
}
