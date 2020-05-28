import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'hs-create-geschlecht',
    templateUrl: './create-geschlecht.component.html',
    styleUrls: ['./create-geschlecht.component.css'],
})
export class CreateGeschlechtComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly geschlecht = new FormControl('MAENNLICH');

    ngOnInit() {
        console.log('CreateGeschlecht.ngOnInit');
        this.form.addControl('geschlecht', this.geschlecht);
    }
}
