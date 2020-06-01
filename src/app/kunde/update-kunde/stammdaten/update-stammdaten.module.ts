import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateKategorieModule } from './update-kategorie.module';
import { UpdateStammdatenComponent } from './update-stammdaten.component';

@NgModule({
    declarations: [UpdateStammdatenComponent],
    exports: [UpdateStammdatenComponent],
    imports: [ReactiveFormsModule, UpdateKategorieModule],
})
export class UpdateStammdatenModule {}
