import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import type { OnInit } from '@angular/core';

@Component({
    // moduleId: module.id,
    selector: 'hs-create-nachname',
    templateUrl: './create-nachname.component.html',
})
export class CreateNachnameComponent implements OnInit {
    private static readonly MIN_LENGTH = 2;

    @Input()
    readonly form!: FormGroup;

    // Keine Vorbelegung bzw. der leere String, da es Placeholder gibt
    // Varianten fuer Validierung:
    //    serverseitig mittels Request/Response
    //    clientseitig bei den Ereignissen keyup, change, blur, ...
    // Ein Endbenutzer bewirkt staendig einen neuen Fehlerstatus
    readonly nachname = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreateNachnameComponent.MIN_LENGTH),
        Validators.pattern(/^\w.*$/u),
    ]);
    // readonly titelGroup = new FormGroup({ titel: this.titel })

    ngOnInit() {
        console.log('CreateNachnameComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('nachname', this.nachname);
    }
}
