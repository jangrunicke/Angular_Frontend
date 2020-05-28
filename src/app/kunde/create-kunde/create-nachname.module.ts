import { CommonModule } from '@angular/common';
import { CreateNachnameComponent } from './create-nachname.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreateNachnameComponent],
    exports: [CreateNachnameComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
})
export class CreateNachnameModule {}
