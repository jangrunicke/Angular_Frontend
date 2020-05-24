import { MainComponent } from './main.component';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [MainComponent],
    exports: [MainComponent],
    // fuer router-outlet
    imports: [RouterModule, MatButtonModule],
})
export class MainModule {}
