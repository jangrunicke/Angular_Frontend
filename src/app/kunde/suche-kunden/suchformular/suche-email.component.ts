import { Component } from '@angular/core';

@Component({
    selector: 'hs-suche-email',
    templateUrl: './suche-email.component.html',
    styleUrls: ['./suche-email.component.css'],
})
export class SucheEmailComponent {
    email = '';

    constructor() {
        console.log('SucheEmailComponent.constructor()');
    }
}
