import { BasicAuthService } from './basic-auth.service';
import { CookieService } from './cookie.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// export const ROLLE_ADMIN = 'admin';
// Spring Security:
export const ROLLE_ADMIN = 'ROLE_ADMIN';

/* eslint-disable no-underscore-dangle */
@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly _isLoggedInSubject = new Subject<boolean>();
    private readonly _rollenSubject = new Subject<Array<string>>();

    constructor(
        private readonly basicService: BasicAuthService,
        private readonly cookieService: CookieService,
    ) {
        console.log('AuthService.constructor()');
    }

    /**
     * @param username als String
     * @param password als String
     * @return void
     */
    async login(username: string | undefined, password: string | undefined) {
        console.log(
            `AuthService.login(): username=${username}, password=${password}`,
        );
        let rollen: Array<string> = [];
        try {
            // this.basicAuthService.login(username, password)
            rollen = await this.basicService.login(username, password);
            console.log('AuthService.login()', rollen);
            this.isLoggedInSubject.next(true);
        } catch (err) {
            console.warn('AuthService.login(): Exception', err);
            this.isLoggedInSubject.next(false);
        }

        this._rollenSubject.next(rollen);
    }

    /**
     * @return void
     */
    logout() {
        console.warn('AuthService.logout()');
        this.cookieService.deleteAuthorization();
        this.isLoggedInSubject.next(false);
        this._rollenSubject.next([]);
    }

    get isLoggedInSubject() {
        return this._isLoggedInSubject;
    }

    get rollenSubject() {
        return this._rollenSubject;
    }

    /**
     * @return String fuer JWT oder Basic-Authentifizierung
     */
    get authorization() {
        return this.cookieService.getAuthorization();
    }

    /**
     * @return True falls ein User eingeloggt ist.
     */
    isLoggedIn() {
        return this.cookieService.getAuthorization !== undefined;
    }

    /**
     * @return true, falls ein User in der Rolle "admin" eingeloggt ist;
     *          sonst false.
     */
    get isAdmin() {
        const rolesStr = this.cookieService.getRoles();
        if (rolesStr === undefined) {
            return false;
        }

        const rolesArray = rolesStr.split(',');
        return rolesArray !== undefined && rolesArray.includes(ROLLE_ADMIN);
    }
}

/* eslint-enable no-underscore-dangle */
