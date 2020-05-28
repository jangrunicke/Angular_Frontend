import { CommonModule } from '@angular/common';
import { CreateEmailModule } from './create-email.module';
import { CreateGeburtsdatumModule } from './create-geburtsdatum.module';
import { CreateGeschlechtModule } from './create-geschlecht.module';
import { CreateInteressenModule } from './create-interessen.module';
import { CreateKategorieModule } from './create-kategorie.module';
import { CreateKundeComponent } from './create-kunde.component';
import { CreateNachnameModule } from './create-nachname.module';
import { CreateNewsletterModule } from './create-newsletter.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
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
        CreateNewsletterModule,
        CreateGeburtsdatumModule,
        CreateGeschlechtModule,
        CreateInteressenModule,
    ],
    providers: [Title, MatDatepickerModule, MatNativeDateModule],
})
export class CreateKundeModule {}
