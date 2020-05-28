import { CreateGeburtsdatumComponent } from './create-geburtsdatum.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreateGeburtsdatumComponent],
    exports: [CreateGeburtsdatumComponent],
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
    ],
    providers: [MatDatepickerModule, MatNativeDateModule],
})
export class CreateGeburtsdatumModule {}
