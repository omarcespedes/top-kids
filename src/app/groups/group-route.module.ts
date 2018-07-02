import { LoginGuardService } from './../login/login-guard.service';
import { RouterModule } from '@angular/router';
import { GroupDetailComponent } from './group-detail.component';
import { GroupListComponent } from './group-list.component';
import { NgModule } from '@angular/core';


const groupRoutes = [
    {path: 'groups', component: GroupListComponent, canActivate: [LoginGuardService]},
    {path: 'group/:id', component: GroupDetailComponent, canActivate: [LoginGuardService]}
]

@NgModule({
    imports: [
        RouterModule.forChild(groupRoutes)
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class GroupRouteModule { }
