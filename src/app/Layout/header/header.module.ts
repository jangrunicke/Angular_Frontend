// import {
//     MatButtonModule,
//     MatToolbarModule,
//     MatIconModule,
//     MatListModule
//     MatSidenavModule,
// } from '@angular/material';
// import { NavComponent } from './nav/nav.component';
// import { LayoutModule } from '@angular/cdk/layout';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatIconModule } from '@angular/material/icon';
// import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { LayoutModule } from '@angular/cdk/layout';
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
        CommonModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        LayoutModule,
    ],
})
export class HeaderModule {}
