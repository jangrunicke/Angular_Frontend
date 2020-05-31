import { CommonModule } from '@angular/common';
import { DetailsEmailModule } from './details-email.module';
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
    ],
})
export class DetailsStammdatenModule {}
