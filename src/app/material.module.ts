import { NgModule } from '@angular/core';

import {
    MatTabsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatRadioModule,
    MatSnackBarModule,
    MatIconModule,
    MatCheckboxModule
} from '@angular/material';
import {MatListModule} from '@angular/material/list';

@NgModule({
    imports: [
        MatListModule,
        MatTabsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatSidenavModule,
        MatRadioModule,
        MatSnackBarModule,
        MatIconModule,
        MatCheckboxModule
    ],
    exports: [
        MatListModule,
        MatTabsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatSidenavModule,
        MatRadioModule,
        MatSnackBarModule,
        MatIconModule,
        MatCheckboxModule
    ],
    declarations: [],
    providers: [],
})
export class MaterialModule { }
