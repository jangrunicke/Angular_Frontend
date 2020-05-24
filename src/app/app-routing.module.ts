import { RouterModule, Routes } from '@angular/router';
import { HOME_PATH } from './shared';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        redirectTo: HOME_PATH,
        // redirect erfordert pathMatch full
        pathMatch: 'full',
    },
    {
        path: HOME_PATH,
        component: HomeComponent,
    },
    // {
    //     path: 'kunde',
    //     loadChildren: () =>
    //         import('./kunde/kunde-routing.module').then(
    //             mod => mod.KundeRoutingModule,
    //         ),
    // },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}