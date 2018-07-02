import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PurchaseRouteModule } from './purchase-route.module';
import { PurchaseFormComponent } from './purchase-form.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        PurchaseRouteModule,
        FormsModule,
        MaterialModule,
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        PurchaseFormComponent
    ],
    providers: [],
})
export class PurchaseModule { }
