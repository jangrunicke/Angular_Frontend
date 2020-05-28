import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterModule } from './layout/footer/footer.module';
import { HeaderModule } from './layout/header/header.module';
import { HomeModule } from './home/home.module';
import { KundeModule } from './kunde/kunde.module';
import { MainModule } from './layout/main/main.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { authInterceptorProviders } from './auth/auth.interceptor';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [AppComponent],

    imports: [
        /* eslint-disable object-curly-newline */
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
        /* eslint-enable object-curly-newline */

        // BrowserAnimationsModule importiert BrowserModule
        BrowserAnimationsModule,
        MatButtonModule,

        HomeModule,
        KundeModule,
        AppRoutingModule,
        FooterModule,
        MainModule,
        HeaderModule,
        MatDatepickerModule,
    ],

    providers: [authInterceptorProviders],
    // providers: [authInterceptorProviders],

    bootstrap: [AppComponent],
})
export class AppModule {}
