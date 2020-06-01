import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { Geschlecht } from '../../shared/kunde';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-geschlecht</code>
 */
@Component({
    selector: 'hs-update-geschlecht',
    templateUrl: './update-geschlecht.component.html',
    styleUrls: ['./update-geschlecht.component.css'],
})
export class UpdateGeschlechtComponent implements OnInit {
    // <hs-update-geschlecht [form]="form" [currentValue]="...">
    @Input()
    readonly form!: FormGroup;
    @Input()
    readonly currentValue: Geschlecht | undefined;

    geschlecht!: FormControl;

    ngOnInit() {
        console.log(
            'UpdateGeschlechtComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.geschlecht = new FormControl(this.currentValue);
        this.form.addControl('geschlecht', this.geschlecht);
    }
}
