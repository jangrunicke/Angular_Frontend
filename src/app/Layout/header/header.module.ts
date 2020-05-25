// import {
//     MatButtonModule,
//     MatToolbarModule,
//     MatIconModule,
//     MatListModule
//     MatSidenavModule,
// } from '@angular/material';
import { HeaderComponent } from './header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [HeaderComponent],
    exports: [HeaderComponent],

    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
    ],
})
export class HeaderModule {}
