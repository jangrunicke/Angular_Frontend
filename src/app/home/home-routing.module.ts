import { RouterModule, Routes } from '@angular/router';
import { HOME_PATH } from '../shared/paths';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';

// Route-Definitonen fuer das Feature-Modul "home":
// Zuordnung von Pfaden und Komponenten mit HTML-Templates
const routes: Routes = [
    {
        path: HOME_PATH,
        // TODO Lazy Loading der Child-Komponenten
        component: HomeComponent,
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class HomeRoutingModule {}
