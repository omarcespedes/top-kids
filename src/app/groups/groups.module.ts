import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentsModule } from './../base/components/components.module';
import { CommonModule } from '@angular/common';
import { GroupRouteModule } from './group-route.module';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { GroupDetailComponent } from './group-detail.component';
import { GroupListComponent } from './group-list.component';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [
        FormsModule,
        MaterialModule,
        GroupRouteModule,
        CommonModule,
        ComponentsModule,
        FlexLayoutModule
    ],
    exports: [],
    declarations: [
        GroupListComponent,
        GroupDetailComponent
    ],
    providers: [],
})
export class GroupsModule { }
