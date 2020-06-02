import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Kunde, KundeService } from '../../shared';
import type { OnDestroy, OnInit } from '@angular/core';
import { HOME_PATH } from '../../../shared';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-interessen</code>
 */
@Component({
    selector: 'hs-update-interessen',
    templateUrl: './update-interessen.component.html',
    styleUrls: ['./update-interessen.component.css'],
})
export class UpdateInteressenComponent implements OnInit, OnDestroy {
    // <hs-update-interessen [buch]="...">
    @Input()
    readonly kunde!: Kunde;

    form!: FormGroup;
    reisen!: FormControl;
    lesen!: FormControl;
    sport!: FormControl;

    private updateSubscription: Subscription | undefined;

    constructor(
        private readonly kundeservice: KundeService,
        private readonly router: Router,
    ) {
        console.log('UpdateInteressenComponent.constructor()');
    }

    /**
     * Das Formular als Gruppe von Controls initialisieren und mit den
     * Interessen des zu &auml;ndernden Kunden vorbelegen.
     */
    ngOnInit() {
        console.log('kunde=', this.kunde);

        // Definition und Vorbelegung der Eingabedaten (hier: Checkbox)
        const hasReisen = this.kunde.hasInteresse('R');
        this.reisen = new FormControl(hasReisen);
        const hasLesen = this.kunde.hasInteresse('L');
        this.lesen = new FormControl(hasLesen);
        const hasSport = this.kunde.hasInteresse('S');
        this.sport = new FormControl(hasSport);

        this.form = new FormGroup({
            // siehe ngFormControl innerhalb von @Component({template: `...`})
            reisen: this.reisen,
            lesen: this.lesen,
            sport: this.sport,
        });
    }

    ngOnDestroy() {
        if (this.updateSubscription !== undefined) {
            this.updateSubscription.unsubscribe();
        }
    }

    /**
     * Die aktuellen Interessen f&uuml;r das angezeigte Kunde-Objekt
     * zur&uuml;ckschreiben.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    // eslint-disable-next-line max-lines-per-function
    onUpdate() {
        if (this.form.pristine) {
            console.log(
                'UpdateInteressenComponent.onUpdate(): keine Aenderungen',
            );
            return undefined;
        }

        if (this.kunde === undefined) {
            console.error(
                'UpdateInteressenComponent.onUpdate(): kunde === undefined',
            );
            return undefined;
        }

        this.kunde.updateInterssen(
            this.reisen.value,
            this.lesen.value,
            this.sport.value,
        );
        console.log('kunde=', this.kunde);

        const successFn = () => {
            console.log(
                `UpdateInteressenComponent.onUpdate(): successFn: path: ${HOME_PATH}`,
            );
            this.router
                .navigate([HOME_PATH])
                .then(
                    navResult => {
                        if (navResult) {
                            console.log(
                                'UpdateInteressenComponent.onUpdate(): Navigation',
                            );
                            return true;
                        }
                        console.error(
                            'UpdateInteressenComponent.onUpdate(): Navigation fehlgeschlagen',
                        );
                        return false;
                    },
                    () => {
                        console.error(
                            'UpdateInteressenComponent.onUpdate(): Navigation fehlgeschlagen',
                        );
                        return false;
                    },
                )
                .catch(err =>
                    console.error(
                        'UpdateInteressenComponent.onUpdate(): Navigation fehlgeschlagen:',
                        err,
                    ),
                );
        };
        const errorFn: (
            status: number,
            errors: { [s: string]: unknown } | undefined,
        ) => void = (status, errors = undefined) => {
            console.error(
                `UpdateInteressenComponent.onUpdate(): errorFn(): status: ${status}, errors=`,
                errors,
            );
        };
        this.updateSubscription = this.kundeservice.update(
            this.kunde,
            successFn,
            errorFn,
        );

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum
        // Refresh der gesamten Seite
        return false;
    }
}
