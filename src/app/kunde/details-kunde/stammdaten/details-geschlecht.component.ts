import { Component, Input } from '@angular/core';
import type { Geschlecht } from '../../shared/kunde';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-geschlecht</code>
 */
@Component({
    selector: 'hs-details-geschlecht',
    templateUrl: './details-geschlecht.component.html',
    styleUrls: ['./details-geschlecht.component.css'],
})
export class DetailsGeschlechtComponent implements OnInit {
    @Input()
    readonly geschlecht!: Geschlecht;

    ngOnInit() {
        console.log(`DetailsGeschlechtComponent.art=${this.geschlecht}`);
    }
}
