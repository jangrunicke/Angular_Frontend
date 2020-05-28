import { CommonModule } from '@angular/common';
import { ErrorMessageModule } from '../../../shared/error-message.module';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SuchergebnisComponent } from './suchergebnis.component';
import { WaitingModule } from '../../../shared/waiting.module';

@NgModule({
    declarations: [SuchergebnisComponent],
    exports: [SuchergebnisComponent],
    imports: [
        CommonModule,
        RouterModule,
        ErrorMessageModule,
        WaitingModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
    ],
})
export class SuchergebnisModule {}
