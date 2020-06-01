import { CommonModule } from '@angular/common';
import { DetailsEmailModule } from './details-email.module';
import { DetailsFamilienstandModule } from './details-familienstand.module';
import { DetailsGeburtsdatumModule } from './details-geburtsdatum.module';
import { DetailsGeschlechtModule } from './details-geschlecht.module';
import { DetailsHomepageModule } from './details-homepage.module';
import { DetailsKategorieModule } from './details-kategorie.module';
import { DetailsNachnameModule } from './details-nachname.module';
import { DetailsStammdatenComponent } from './details-stammdaten.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [DetailsStammdatenComponent],
    exports: [DetailsStammdatenComponent],
    imports: [
        CommonModule,
        DetailsNachnameModule,
        DetailsEmailModule,
        DetailsKategorieModule,
        DetailsGeburtsdatumModule,
        DetailsHomepageModule,
        DetailsGeschlechtModule,
        DetailsFamilienstandModule,
    ],
})
export class DetailsStammdatenModule {}
