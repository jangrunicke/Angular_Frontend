import { MatSliderModule } from '@angular/material/slider';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateKategorieComponent } from './update-kategorie.component';

@NgModule({
    declarations: [UpdateKategorieComponent],
    exports: [UpdateKategorieComponent],
    imports: [ReactiveFormsModule, MatSliderModule],
})
export class UpdateKategorieModule {}
