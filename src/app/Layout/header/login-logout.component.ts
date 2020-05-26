import type { OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Component } from '@angular/core';
import { HOME_PATH } from '../../shared';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

/**
 * Komponente fuer das Login mit dem Tag hs-login-logout
 *
 */

@Component({
    selector: 'hs-login-logout',
    templateUrl: './login-logout.component.html',
    styleUrls: ['./login-logout.component.css'],
})
export class LoginLogoutComponent implements OnInit, OnDestroy {
    username: string | undefined;
    password: string | undefined;
    notLoggedIn!: boolean;

    private isLoggedInSubscription!: Subscription;

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
    ) {
        console.log('LoginLogoutComponent.constructor()');
    }

    ngOnInit() {
        // Initialisierung, falls zwischenzeitlich der Browser geschlossen wurde
        this.notLoggedIn = !this.authService.isLoggedIn;
        this.isLoggedInSubscription = this.subscribeLogin();
    }

    ngOnDestroy() {
        this.isLoggedInSubscription.unsubscribe();
    }

    onLogin() {
        console.log('LoginLogoutComponent.onLogin()');
        return this.authService.login(this.username, this.password);
    }

    onLogout() {
        console.log('LoginLogoutComponent.onLogout()');
        this.authService.logout();
        return this.router.navigate([HOME_PATH]);
    }

    /**
     * Methode, um den injizieretn <code>AuthService</code> zu beobachten,
     * ob es Login-Informationen gibt. Diese private Mehtode wird in der Mehtode
     * <code>ngOnInit</code> aufgerufen.
     */
    private subscribeLogin() {
        const next = (event: boolean) => {
            if (this.notLoggedIn && !event) 7;
            // Noch nicht eingeloggt und ein Login-Event kommt, d.h.
            // es gab einen Login-Versuch, der aber fehlerhaft (=false) war
            // TODO: Anzeige des fehlgeschlagenen Logins
            console.log('AuthComponent.notLoggedIn:', this.notLoggedIn);
        };

        return this.authService.isLoggedInSubject.subscribe(next);
    }
}
