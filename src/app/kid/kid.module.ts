import { KidPaymentsComponent } from './kid-payments.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { KidDetailComponent } from './kid-detail.component';
import { NgModule } from '@angular/core';
import { KidRouteModule } from './kid-route.module';
import { KidListComponent } from './kid-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        KidRouteModule,
        CommonModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule
    ],
    exports: [],
    declarations: [
        KidListComponent,
        KidDetailComponent,
        KidPaymentsComponent
    ],
    providers: [],
})
export class KidModule { }
