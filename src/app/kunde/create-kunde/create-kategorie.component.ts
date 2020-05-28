import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { OnInit } from '@angular/core';

/**
 * Komponente mit dem Tag &lt;hs-create-rating&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Buch zu realisieren.
 */
@Component({
    selector: 'hs-create-kategorie',
    templateUrl: './create-kategorie.component.html',
    styleUrls: ['./create-kategorie.component.css'],
})
export class CreateKategorieComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly kategorie = new FormControl(undefined);

    ngOnInit() {
        console.log('CreateKategorieComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('rating', this.kategorie);
    }
}
