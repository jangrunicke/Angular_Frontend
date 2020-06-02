import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { UpdateInteressenComponent } from './update-interessen.component';

@NgModule({
    declarations: [UpdateInteressenComponent],
    exports: [UpdateInteressenComponent],
    imports: [ReactiveFormsModule, MatCheckboxModule, MatButtonModule],
})
export class UpdateInteressenModule {}
