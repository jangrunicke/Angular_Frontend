import { CreateKundeModule } from './create-kunde/create-kunde.module';
import { KundeRoutingModule } from './kunde-routing.module';
import { NgModule } from '@angular/core';
import { SucheKundenModule } from './suche-kunden/suche-kunden.module';

@NgModule({
    // // eslint-disable-next-line prettier/prettier
    imports: [SucheKundenModule, KundeRoutingModule, CreateKundeModule],
})
export class KundeModule {}
