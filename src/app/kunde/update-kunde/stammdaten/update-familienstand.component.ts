import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { Familienstand } from '../../shared/kunde';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-familienstand</code>
 */
@Component({
    selector: 'hs-update-familienstand',
    templateUrl: './update-familienstand.component.html',
    styleUrls: ['./update-familienstand.component.css'],
})
export class UpdateFamilienstandComponent implements OnInit {
    // <hs-update-geschlecht [form]="form" [currentValue]="...">
    @Input()
    readonly form!: FormGroup;
    @Input()
    readonly currentValue: Familienstand | undefined | '';

    familienstand!: FormControl;

    ngOnInit() {
        console.log(
            'UpdateGeschlechtComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.familienstand = new FormControl(this.currentValue);
        this.form.addControl('familienstand', this.familienstand);
    }
}
