import { CreateInteressenComponent } from './create-interessen.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreateInteressenComponent],
    exports: [CreateInteressenComponent],
    imports: [ReactiveFormsModule, MatCheckboxModule],
})
export class CreateInteressenModule {}
