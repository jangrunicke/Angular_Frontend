import { AuthService, ROLLE_ADMIN } from '../../auth/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import type { OnDestroy, OnInit } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Component } from '@angular/core';

@Component({
    selector: 'hs-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.componenent.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAdmin!: boolean;

    // eslint-disable-next-line no-invalid-this
    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay(),
        );

    private isAdminSubscription!: Subscription;

    constructor(
        // eslint-disable-next-line @typescript-eslint/prefer-readonly
        private breakpointObserver: BreakpointObserver,
        private readonly authService: AuthService,
    ) {
        console.log('HeaderComponent.constructor()');
    }

    ngOnInit() {
        this.isAdmin = this.authService.isAdmin;

        // beobachten, ob es Informationen zur Rolle "admin" gibt
        this.isAdminSubscription = this.subscribeIsAdmin();
    }

    ngOnDestroy() {
        this.isAdminSubscription.unsubscribe();
    }

    private subscribeIsAdmin() {
        const next = (event: Array<string>) => {
            this.isAdmin = event !== undefined && event.includes(ROLLE_ADMIN);
            console.log('NavComponent.isAdmin', this.isAdmin);
        };
        return this.authService.rollenSubject.subscribe(next);
    }
}
