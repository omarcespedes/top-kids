import { FooterComponent } from './footer.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        FooterComponent
    ],
    declarations: [FooterComponent],
    providers: [],
})
export class MainComponentsModule { }
