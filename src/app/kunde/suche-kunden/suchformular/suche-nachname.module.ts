import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { SucheNachnameComponent } from './suche-nachname.component';

@NgModule({
    declarations: [SucheNachnameComponent],
    exports: [SucheNachnameComponent],
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
    ],
})
export class SucheNachnameModule {}
