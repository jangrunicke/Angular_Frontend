import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// mport { KundeModule } from './kunde/kunde.module';
import { FooterModule } from './layout/footer/footer.module';
import { HeaderModule } from './layout/header/header.module';
import { HomeModule } from './home/home.module';
import { MainModule } from './layout/main/main.module';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
// import { authInterceptorProviders } from './auth/auth.interceptor';
import { environment } from '../environments/environment';
import { MainNavComponent } from './Layout/header/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [AppComponent, MainNavComponent, HeaderComponent],

    imports: [
        /* eslint-disable object-curly-newline */
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
        /* eslint-enable object-curly-newline */

        // BrowserAnimationsModule importiert BrowserModule
        BrowserAnimationsModule,

        AppRoutingModule,
        HomeModule,
        // KundeModule,
        FooterModule,
        HeaderModule,
        MainModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
    ],

    // providers: [authInterceptorProviders],

    bootstrap: [AppComponent],
})
export class AppModule {}
