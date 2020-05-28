import { CreateGeschlechtComponent } from './create-geschlecht.component';
import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreateGeschlechtComponent],
    exports: [CreateGeschlechtComponent],
    imports: [ReactiveFormsModule, MatRadioModule],
})
export class CreateGeschlechtModule {}
