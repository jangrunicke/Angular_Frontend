import { NgModule } from '@angular/core';
import { SucheKundenComponent } from './suche-kunden.component';
import { Title } from '@angular/platform-browser';

// Ein Modul enthaelt logisch zusammengehoerige Funktionalitaet.
// Exportierte Komponenten koennen bei einem importierenden Modul in dessen
// Komponenten innerhalb deren Templates (= HTML-Fragmente) genutzt werden.
// SucheBuecherModule ist ein "FeatureModule", das Features fuer Buecher bereitstellt
@NgModule({
    declarations: [SucheKundenComponent],
    exports: [SucheKundenComponent],
    imports: [],
    providers: [Title],
})
export class SucheKundenModule {}
