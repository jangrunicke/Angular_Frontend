import { Component } from '@angular/core';

@Component({
    selector: 'hs-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent {
    constructor() {
        console.log('MainComponent.constructor()');
    }
}
