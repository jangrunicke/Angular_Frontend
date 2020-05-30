import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'hs-create-user',
    templateUrl: './create-user.component.html',
})
export class CreateUserComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly username = new FormControl(undefined, [
        Validators.required,
        Validators.pattern(/^\w*/u),
    ]);

    ngOnInit() {
        console.log('CreateUserComponent.ngOnInit');

        this.form.addControl('username', this.username);
    }
}
