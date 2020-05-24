import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// mport { KundeModule } from './kunde/kunde.module';
// import { FooterModule } from './layout/footer/footer.module';
// import { HeaderModule } from './layout/header/header.module';
// import { HomeModule } from './home/home.module';
// import { MainModule } from './layout/main/main.module';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
// import { authInterceptorProviders } from './auth/auth.interceptor';
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

        AppRoutingModule,
    ],

    // providers: [authInterceptorProviders],

    bootstrap: [AppComponent],
})
export class AppModule {}
