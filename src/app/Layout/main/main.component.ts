import { Component } from '@angular/core';

@Component({
    selector: 'hs-main',
    template: `
        <main>
            <div><router-outlet></router-outlet></div>
        </main>
    `,
})
export class MainComponent {
    constructor() {
        console.log('MainComponent.constructor()');
    }
}
