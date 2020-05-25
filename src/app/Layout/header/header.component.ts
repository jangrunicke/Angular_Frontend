import { Component } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'hs-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.componenent.css'],
})
export class HeaderComponent {
    private _mobileQueryListener: () => void;

    constructor() {
        console.log('FooterComponent.constructor()');
    }
}
