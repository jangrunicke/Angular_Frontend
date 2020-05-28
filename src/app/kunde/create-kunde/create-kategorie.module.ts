import { CreateKategorieComponent } from './create-kategorie.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreateKategorieComponent],
    exports: [CreateKategorieComponent],
    imports: [ReactiveFormsModule, MatFormFieldModule, MatSliderModule],
})
export class CreateKategorieModule {}
