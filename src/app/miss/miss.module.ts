import { MissPaymentComponent } from './miss-payment/miss-payment.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GroupService } from './../groups/group.service';
import { FormsModule } from '@angular/forms';
import { MissService } from './miss.service';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { MissRouteModule } from './miss-route.module';
import { MissDetailComponent } from './miss-detail.component';
import { MissListComponent } from './miss-list.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MissRouteModule,
        CommonModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule
    ],
    exports: [],
    declarations: [
        MissListComponent,
        MissDetailComponent,
        MissPaymentComponent
    ],
    providers: [
        MissService,
        GroupService
    ],
})
export class MissModule { }
