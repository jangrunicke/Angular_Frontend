import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'hs-create-adresse',
    templateUrl: './create-adresse.component.html',
})
export class CreateAdresseComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly ort = new FormControl(undefined);

    readonly plz = new FormControl(undefined);

    ngOnInit() {
        console.log('CreateAdresseComponent.ngOnInit');

        this.form.addControl('ort', this.ort);
        this.form.addControl('plz', this.plz);
    }
}
