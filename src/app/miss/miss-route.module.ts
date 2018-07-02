import { MissPaymentComponent } from './miss-payment/miss-payment.component';
import { LoginGuardService } from './../login/login-guard.service';
import { MissDetailComponent } from './miss-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Router} from '@angular/router';
import { MissListComponent } from './miss-list.component';

const missRoutes = [
    {path: 'misses', component: MissListComponent, canActivate: [LoginGuardService]},
    {path: 'missDetail/:id', component: MissDetailComponent, canActivate: [LoginGuardService]},
    {path: 'missPayment', component: MissPaymentComponent, canActivate: [LoginGuardService]}
];

@NgModule({
    imports: [
        RouterModule.forChild(missRoutes)
    ],
    exports: [RouterModule]
})
export class MissRouteModule { }
