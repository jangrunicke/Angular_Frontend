import { CommonModule } from '@angular/common';
import { CreateEmailModule } from './create-email.module';
import { CreateKategorieModule } from './create-kategorie.module';
import { CreateKundeComponent } from './create-kunde.component';
import { CreateNachnameModule } from './create-nachname.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [CreateKundeComponent],
    exports: [CreateKundeComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        CreateNachnameModule,
        CreateEmailModule,
        CreateKategorieModule,
    ],
    providers: [Title],
})
export class CreateKundeModule {}
