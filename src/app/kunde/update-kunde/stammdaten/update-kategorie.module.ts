import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateKategorieComponent } from './update-kategorie.component';

@NgModule({
    declarations: [UpdateKategorieComponent],
    exports: [UpdateKategorieComponent],
    imports: [
        ReactiveFormsModule,
        MatSliderModule,
        MatOptionModule,
        MatFormFieldModule,
        MatSelectModule,
    ],
})
export class UpdateKategorieModule {}
