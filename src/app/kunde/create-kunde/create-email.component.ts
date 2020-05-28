import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import type { OnInit } from '@angular/core';

@Component({
    // moduleId: module.id,
    selector: 'hs-create-email',
    templateUrl: './create-email.component.html',
})
export class CreateEmailComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly email = new FormControl(undefined, [
        Validators.required,
        Validators.email,
    ]);
    // readonly titelGroup = new FormGroup({ titel: this.titel })

    ngOnInit() {
        console.log('CreateEmailComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('email', this.email);
    }
}
