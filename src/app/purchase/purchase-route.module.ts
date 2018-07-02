import { LoginGuardService } from './../login/login-guard.service';
import { RouterModule } from '@angular/router';
import { PurchaseFormComponent } from './purchase-form.component';
import { NgModule } from '@angular/core';

const purchaseRoutes = [
    {path: 'purchase/:type', component: PurchaseFormComponent, canActivate: [LoginGuardService]}
]

@NgModule({
    imports: [RouterModule.forChild(purchaseRoutes)],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class PurchaseRouteModule { }
