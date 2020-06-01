import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateFamilienstandModule } from './update-familienstand.module';
import { UpdateGeschlechtModule } from './update-geschlecht.module';
import { UpdateHomepageModule } from './update-homepage.module';
import { UpdateKategorieModule } from './update-kategorie.module';
import { UpdatePlzModule } from './update-plz.module';
import { UpdateStammdatenComponent } from './update-stammdaten.component';

@NgModule({
    declarations: [UpdateStammdatenComponent],
    exports: [UpdateStammdatenComponent],
    imports: [
        ReactiveFormsModule,
        UpdateKategorieModule,
        UpdateHomepageModule,
        UpdateGeschlechtModule,
        UpdateFamilienstandModule,
        UpdatePlzModule,
    ],
})
export class UpdateStammdatenModule {}
