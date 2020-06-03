import { Component, Input } from '@angular/core';
import { Kunde, KundeService } from '../../shared';
import type { OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HOME_PATH } from '../../../shared';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-stammdaten</code>
 */
@Component({
    selector: 'hs-update-stammdaten',
    templateUrl: './update-stammdaten.component.html',
})
export class UpdateStammdatenComponent implements OnInit, OnDestroy {
    // <hs-update-stammdaten [kunde]="...">
    @Input()
    readonly kunde!: Kunde;

    readonly form = new FormGroup({});

    private updateSubscription: Subscription | undefined;

    constructor(
        private readonly kundeService: KundeService,
        private readonly router: Router,
    ) {
        console.log('UpdateStammdatenComponent.constructor()');
    }

    /**
     * Das Formular als Gruppe von Controls initialisieren und mit den
     * Stammdaten des zu &auml;ndernden Kunden vorbelegen.
     */
    ngOnInit() {
        console.log('UpdateStammdatenComponent.ngOnInit(): kunde=', this.kunde);
    }

    ngOnDestroy() {
        if (this.updateSubscription !== undefined) {
            this.updateSubscription.unsubscribe();
        }
    }

    /**
     * Die aktuellen Stammdaten f&uuml;r das angezeigte Kunde-Objekt
     * zur&uuml;ckschreiben.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    // eslint-disable-next-line max-lines-per-function
    onUpdate() {
        if (this.form.pristine) {
            console.log(
                'UpdateStammdatenComponent.onUpdate(): keine Aenderungen',
            );
            return undefined;
        }

        if (this.kunde === undefined) {
            console.error(
                'UpdateStammdatenComponent.onUpdate(): kunde === undefined',
            );
            return undefined;
        }

        // rating, preis und rabatt koennen im Formular nicht geaendert werden
        this.kunde.updateStammdaten(
            this.kunde.nachname,
            this.kunde.email,
            this.kunde.kategorie,
            this.kunde.geburtsdatum,
            this.form.value.homepage,
            this.form.value.geschlecht,
            this.form.value.familienstand,
            this.form.value.plz,
            this.form.value.ort,
            this.form.value.newsletter,
        );
        console.log('kunde=', this.kunde);

        const successFn = () => {
            console.log(
                `UpdateStammdaten.onUpdate(): successFn: path: ${HOME_PATH}`,
            );
            this.router
                .navigate([HOME_PATH])
                .then(
                    navResult => {
                        if (navResult) {
                            console.log(
                                'UpdateStammdaten.onUpdate(): Navigation',
                            );
                            return true;
                        }
                        console.error(
                            'UpdateStammdaten.onUpdate(): Navigation fehlgeschlagen',
                        );
                        return false;
                    },
                    () => {
                        console.error(
                            'UpdateStammdaten.onUpdate(): Navigation fehlgeschlagen',
                        );
                        return false;
                    },
                )
                .catch(err =>
                    console.error(
                        'UpdateStammdaten.onUpdate(): Navigation fehlgeschlagen:',
                        err,
                    ),
                );
        };
        const errorFn: (
            status: number,
            errors: { [s: string]: unknown } | undefined,
        ) => void = (status, errors = undefined) => {
            console.error(
                `UpdateStammdatenComponent.onUpdate(): errorFn(): status: ${status}, errors=`,
                errors,
            );
        };

        this.updateSubscription = this.kundeService.update(
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
