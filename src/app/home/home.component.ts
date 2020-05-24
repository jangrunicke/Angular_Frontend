import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'hs-home',

    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    constructor(private readonly title: Title) {
        console.log('HomeComponent.constructor()');
    }

    ngOnInit() {
        this.title.setTitle('Beispiel');
    }
}
