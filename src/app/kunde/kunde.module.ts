import { CreateKundeModule } from './create-kunde/create-kunde.module';
import { DetailsKundeModule } from './details-kunde/details-kunde.module';
import { KundeRoutingModule } from './kunde-routing.module';
import { NgModule } from '@angular/core';
import { SucheKundenModule } from './suche-kunden/suche-kunden.module';
import { UpdateKundeModule } from './update-kunde/update-kunde.module';

@NgModule({
    imports: [
        SucheKundenModule,
        KundeRoutingModule,
        CreateKundeModule,
        DetailsKundeModule,
        UpdateKundeModule,
    ],
})
export class KundeModule {}
