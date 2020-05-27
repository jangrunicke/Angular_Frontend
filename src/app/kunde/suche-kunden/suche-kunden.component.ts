import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import type { Suchkriterien } from '../shared/types';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'hs-suche-kunden',
    templateUrl: './suche-kunden.component.html',
    styleUrls: ['./suche-kunden.component.css'],
})
export class SucheKundenComponent implements OnInit {
    suchkriterien!: Suchkriterien;

    // Wird von der JS-Engine aufgerufen
    constructor(private readonly titleService: Title) {
        console.log('SucheKundenComponent.constructor()');
    }

    // Wird von Angular aufgerufen, wenn der DOM-Baum fertig ist,
    // d.h. nach dem "Rendering".
    // Wird immer generiert, wenn Angular-CLI genutzt wird.
    ngOnInit() {
        this.titleService.setTitle('Suche');
    }

    /**
     * Das Attribut <code>suchkriterien</code> wird auf den Wert des Ereignisses
     * <code>$event</code> vom Typ Suchkriteriengesetzt. Diese Methode wird
     * aufgerufen, wenn in der Kindkomponente f&uuml;r
     * <code>hs-suchformular</code> das Ereignis ausgel&ouml;st wird.
     * Der aktuelle Wert vom Attribut <code>&lt;suchkriterien&gt;</code> an die
     * Kindkomponente f&uuml;r <code>&lt;suchergebnis&gt;</code> weitergereicht.
     * @param $event true f&uuml;r das Ausl&ouml;sen der Suche.
     */
    setSuchkriterien($event: Suchkriterien) {
        console.log(
            'SucheBuecherComponent.setSuchkriterien(): suchkriterien=',
            $event,
        );
        this.suchkriterien = $event;
    }
}
