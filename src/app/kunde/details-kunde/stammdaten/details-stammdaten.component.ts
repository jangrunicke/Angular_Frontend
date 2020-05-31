import { Component, Input } from '@angular/core';
import { Kunde } from '../../shared/kunde';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'hs-details-stammdaten',
    templateUrl: './details-stammdaten.component.html',
})
export class DetailsStammdatenComponent implements OnInit {
    @Input()
    kunde!: Kunde;

    ngOnInit() {
        console.log('DetailsStammdatenComponent.kunde=', this.kunde);
    }
}
