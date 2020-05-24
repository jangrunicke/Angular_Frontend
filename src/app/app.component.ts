import { Component, VERSION } from '@angular/core';

@Component({
    selector: 'hs-root',

    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'acme';

    constructor() {
        console.log('AppComponent.constructor()');
        console.info(
            `Angular ${VERSION.full}: Die Webanwendung wird gestartet`,
        );
        console.info(new Intl.DateTimeFormat('de').format(new Date()));

        AppComponent.checkEsVersion();
    }

    private static checkEsVersion() {
        try {
            eval('class Foo { #bar; }'); // eslint-disable-line no-eval
        } catch (err) {
            try {
                eval('[0,[1]].flat();'); // eslint-disable-line no-eval
            } catch (err_) {
                console.error(
                    'ES 2019 wird durch den Webbrowser NICHT unterstuetzt.',
                );
                return;
            }
            console.info('ES 2019 wird durch den Webbrowser unterstuetzt.');
            return;
        }
        console.info('ES 2020 wird durch den Webbrowser unterstuetzt.');
    }
}
