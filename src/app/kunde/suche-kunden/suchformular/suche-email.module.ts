import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { SucheEmailComponent } from './suche-email.component';

@NgModule({
    declarations: [SucheEmailComponent],
    exports: [SucheEmailComponent],
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
    ],
})
export class SucheEmailModule {}
