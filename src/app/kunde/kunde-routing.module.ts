import { RouterModule, Routes } from '@angular/router';
// import { AdminGuard } from '../auth/admin.guard';
import { NgModule } from '@angular/core';
import { SucheKundenComponent } from './suche-kunden/suche-kunden.component';

// Route-Definitionen fuer das Feature-Modul "kunde"
// Zuordnung von Pfaden und Komponent mit HTML-Templates
const routes: Routes = [
    {
        path: 'suche',
        component: SucheKundenComponent,
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class KundeRoutingModule {}
