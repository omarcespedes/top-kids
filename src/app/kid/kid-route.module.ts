import { LoginGuardService } from './../login/login-guard.service';
import { KidPaymentsComponent } from './kid-payments.component';
import { KidDetailComponent } from './kid-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { KidListComponent } from './kid-list.component';

const kidRoutes = [
    {path: 'kids', component: KidListComponent, canActivate: [LoginGuardService]},
    {path: 'kidDetail/:id', component: KidDetailComponent, canActivate: [LoginGuardService]},
    {path: 'kidPayment/:id', component: KidPaymentsComponent, canActivate: [LoginGuardService]}
];

@NgModule({
    imports: [
        RouterModule.forChild(kidRoutes)
    ],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class KidRouteModule { }
