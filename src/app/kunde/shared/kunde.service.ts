/* eslint-disable max-lines,no-null/no-null */

import { BASE_URI, KUNDEN_PATH_REST } from '../../shared';
import type {
    ChartColor,
    ChartConfiguration,
    ChartData,
    ChartDataSets,
} from 'chart.js';
import type { Geschlecht, KundeServer, ServerResponse } from './kunde';
// Bereitgestellt durch HttpClientModule
// HttpClientModule enthaelt nur Services, keine Komponenten
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { DiagrammService } from '../../shared/diagramm.service';
import { Injectable } from '@angular/core';
import { Kunde } from './kunde';
// https://github.com/ReactiveX/rxjs/blob/master/src/internal/Subject.ts
// https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts
import { Subject } from 'rxjs';

// Methoden der Klasse HttpClient
//  * get(url, options) – HTTP GET request
//  * post(url, body, options) – HTTP POST request
//  * put(url, body, options) – HTTP PUT request
//  * patch(url, body, options) – HTTP PATCH request
//  * delete(url, options) – HTTP DELETE request

// Eine Service-Klasse ist eine "normale" Klasse gemaess ES 2015, die mittels
// DI in eine Komponente injiziert werden kann, falls sie innerhalb von
// provider: [...] bei einem Modul oder einer Komponente bereitgestellt wird.
// Eine Komponente realisiert gemaess MVC-Pattern den Controller und die View.
// Die Anwendungslogik wird vom Controller an Service-Klassen delegiert.

/**
 * Die Service-Klasse zu Kunde wird zum "Root Application Injector"
 * hinzugefuegt und ist in allen Klassen der Webanwendung verfuegbar.
 */
/* eslint-disable no-underscore-dangle */
@Injectable({ providedIn: 'root' })
export class KundeService {
    readonly kundenSubject = new Subject<Array<Kunde>>();
    readonly kundeSubject = new Subject<Kunde>();
    readonly errorSubject = new Subject<string | number>();

    private readonly baseUriKunde!: string;

    private _kunde!: Kunde;

    /**
     * @param diagrammService injizierter DiagrammService
     * @param httpClient injizierter Service HttpClient (von Angular)
     * @return void
     */
    constructor(
        private readonly diagrammService: DiagrammService,
        private readonly httpClient: HttpClient,
    ) {
        this.baseUriKunde = `${BASE_URI}/${KUNDEN_PATH_REST}`;
        console.log(
            `KundeService.constructor(): baseUriKunde=${this.baseUriKunde}`,
        );
    }

    /**
     * Ein Kunde-Objekt puffern.
     * @param kunde Das Kunde-Objekt, das gepuffert wird.
     * @return void
     */
    set kunde(kunde: Kunde) {
        console.log(
            `KundeService.constructor(): baseUriKunde=${this.baseUriKunde}`,
        );
        this._kunde = kunde;
    }

    /**
     * Kunden suchen
     * @param suchkriterien Die Suchkriterein
     */
    find(suchkriterien: Suchkriterien | undefined) {
        console.log('KundeService.find(): suchkriterien=', suchkriterien);
        const params = this.suchkriterienToHttpParams(suchkriterien);
        const uri = this.baseUriKunde;
        console.log(`BuchService.find(): uri=${uri}`);

        const errorFn = (err: HttpErrorResponse) => {
            if (err.error instanceof ProgressEvent) {
                console.error('Client-seitiger oder Netzwerkfehler', err.error);
                this.errorSubject.next(-1);
                return;
            }

            const { status } = err;
            console.log(
                `KundeService.find(): errorFn(): status=${status}, ` +
                    'Response-Body=',
                err.error,
            );
            this.errorSubject.next(status);
        };

        // Observable.subscribe() aus RxJS liefert ein Subscription Objekt,
        // mit dem man den Request abbrechen ("cancel") kann
        // https://angular.io/guide/http
        // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/subscribe.md
        // http://stackoverflow.com/questions/34533197/what-is-the-difference-between-rx-observable-subscribe-and-foreach
        // https://xgrommx.github.io/rx-book/content/observable/observable_instance_methods/subscribe.html
        // return this.httpClient
        //     .get<Array<KundeServer>>(uri, { params })
        //     .pipe(
        //         // Pipeable operators
        //         // http://reactivex.io/documentation/operators.html
        //         map(jsonArray =>
        //             jsonArray.map(jsonObjekt => Kunde.fromServer(jsonObjekt)),
        //         ),
        //     )
        //     .subscribe(kunde => this.kundenSubject.next(kunde), errorFn);
        return this.httpClient
            .get<ServerResponse>(uri, { params })
            .pipe(
                map(response => response._embedded),
                map(embedded => embedded.kundeList),
                map(jsonArray =>
                    jsonArray.map(jsonObjekt => Kunde.fromServer(jsonObjekt)),
                ),
            )
            .subscribe(kunde => this.kundenSubject.next(kunde), errorFn);

        // Same-Origin-Policy verhindert Ajax-Datenabfragen an einen Server in
        // einer anderen Domain. JSONP (= JSON mit Padding) ermoeglicht die
        // Uebertragung von JSON-Daten ueber Domaingrenzen.
        // In Angular gibt es dafuer den Service Jsonp.
    }

    /**
     * Einen Kunden anhand der ID suchen
     * @param id Die ID des gesuchten Kunden
     */
    // eslint-disable-next-line max-lines-per-function
    findById(id: string | undefined) {
        console.log(`KundeService.findById(): id=${id}`);

        // Gibt es ein gepuffertes Kunde mit der gesuchten ID und Versionsnr.?
        if (
            this._kunde !== undefined &&
            this._kunde._id === id &&
            this._kunde.version !== undefined
        ) {
            console.log(
                `KundeService.findById(): Kunde gepuffert, version=${this._kunde.version}`,
            );
            this.kundeSubject.next(this._kunde);
            return undefined;
        }
        if (id === undefined) {
            console.log('KundeService.findById(): Keine Id');
            return undefined;
        }

        // Ggf wegen fehlender Versionsnummer (im ETag) nachladen
        const uri = `${this.baseUriKunde}/${id}`;

        const errorFn = (err: HttpErrorResponse) => {
            if (err.error instanceof ProgressEvent) {
                console.error(
                    'KundeService.findById(): errorFn(): Client- oder Netzwerkfehler',
                    err.error,
                );
                this.errorSubject.next(-1);
                return;
            }

            const { status } = err;
            console.log(
                `BuchService.findById(): errorFn(): status=${status}` +
                    'Response-Body=',
                err.error,
            );
            this.errorSubject.next(status);
        };

        console.log('KundeService.findById(): GET-Request');

        let body: KundeServer | null;
        let etag: string | undefined | null;
        return this.httpClient
            .get<KundeServer>(uri, { observe: 'response' })
            .pipe(
                filter(response => {
                    console.debug(
                        'KundeService.findById(): filter(): response=',
                        response,
                    );
                    ({ body } = response);
                    return body !== undefined && body !== null;
                }),
                filter(response => {
                    etag = response.headers.get('ETag');
                    console.log(`etag = ${etag}`);
                    return etag !== undefined && etag !== null;
                }),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                map(_ => {
                    if (body !== null) {
                        if (etag === null) {
                            etag = undefined;
                        }
                        this._kunde = Kunde.fromServer(body, etag);
                    }
                    return this._kunde;
                }),
            )
            .subscribe(kunde => this.kundeSubject.next(kunde), errorFn);
    }
    /**
     * Ein neueen Kunden anlegen
     * @param neuerKunde Das JSON-Objekt mit dem neuen Kunden
     * @param successFn Die Callback-Function fuer den Erfolgsfall
     * @param errorFn Die Callback-Function fuer den Fehlerfall
     */
    save(
        kunde: Kunde,
        successFn: (location: string | undefined) => void,
        errorFn: (status: number, errors: { [s: string]: unknown }) => void,
    ) {
        console.log('KundeService.save(): kunde=', kunde);

        const errorFnPost = (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                console.error(
                    'KundeService.save(): errorFnPost(): Client- oder Netzwerkfehler',
                    err.error.message,
                );
            } else if (errorFn === undefined) {
                console.error('errorFnPost', err);
            } else {
                // z.B. {titel: ..., verlag: ..., isbn: ...}
                errorFn(err.status, err.error);
            }
        };

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'text/plain',
        });
        return this.httpClient
            .post(this.baseUriKunde, kunde.toJSON(), {
                headers,
                observe: 'response',
                responseType: 'text',
            })
            .pipe(
                map(response => {
                    console.debug(
                        'KundeService.save(): map(): response',
                        response,
                    );
                    const headersResponse = response.headers;
                    const location = headersResponse.get('Location');
                    const locationStr =
                        location === null ? undefined : location;
                    return locationStr;
                }),
            )
            .subscribe(location => successFn(location), errorFnPost);
    }

    /**
     * Ein vorhandenen Kunden aktualisieren
     * @param kunde Das JSON-Objekt mit den aktualisierten Kundendaten
     * @param successFn Die Callback-Function fuer den Erfolgsfall
     * @param errorFn Die Callback-Function fuer den Fehlerfall
     */
    update(
        kunde: Kunde,
        successFn: () => void,
        errorFn: (
            status: number,
            errors: { [s: string]: unknown } | undefined,
        ) => void,
    ) {
        console.log('KundeService.update(): kunde=', kunde);

        const { version } = kunde;
        if (version === undefined) {
            console.error(`Keine Versionsnummer fuer das Buch ${kunde._id}`);
            return undefined;
        }
        const successFnPut = () => {
            successFn();
            // Wenn Update erfolgreich war, dann wurde serverseitig die Versionsnr erhoeht
            if (kunde.version === undefined) {
                kunde.version = 1;
            } else {
                kunde.version++;
            }
        };
        const errorFnPut = (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                console.error(
                    'Client-seitiger oder Netzwerkfehler',
                    err.error.message,
                );
            } else if (errorFn === undefined) {
                console.error('errorFnPut', err);
            } else {
                errorFn(err.status, err.error);
            }
        };

        const uri = `${this.baseUriKunde}/${kunde._id}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'text/plain',
            'If-Match': `"${version}"`,
        });
        console.log('headers=', headers);
        return this.httpClient
            .put(uri, kunde, { headers })
            .subscribe(successFnPut, errorFnPut);
    }

    /**
     * Ein Kunde l&ouml;schen
     * @param kunde Das JSON-Objekt mit dem zu loeschenden Kunden
     * @param successFn Die Callback-Function fuer den Erfolgsfall
     * @param errorFn Die Callback-Function fuer den Fehlerfall
     */
    remove(
        kunde: Kunde,
        successFn: (() => void) | undefined,
        errorFn: (status: number) => void,
    ) {
        console.log('KundeService.remove(): kunde=', kunde);
        const uri = `${this.baseUriKunde}/${kunde._id}`;

        const errorFnDelete = (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                console.error(
                    'Client-seitiger oder Netzwerkfehler',
                    err.error.message,
                );
            } else if (errorFn === undefined) {
                console.error('errorFnPut', err);
            } else {
                errorFn(err.status);
            }
        };

        return this.httpClient.delete(uri).subscribe(successFn, errorFnDelete);
    }

    /**
     * Ein Balkendiagramm erzeugen und bei einem Tag <code>canvas</code>
     * einf&uuml;gen.
     * @param chartElement Das HTML-Element zum Tag <code>canvas</code>
     */
    createBarChart(chartElement: HTMLCanvasElement) {
        console.log('KundeService.createBarChart()');
        const uri = this.baseUriKunde;
        return this.httpClient
            .get<Array<KundeServer>>(uri)
            .pipe(
                // ID aus Self-Link
                map(kunden => kunden.map(kunde => this.setKundeId(kunde))),
                map(kunden => {
                    const kundenGueltig = kunden.filter(
                        b => b._id !== undefined && b.kategorie !== undefined,
                    );
                    const labels = kundenGueltig
                        .map(b => b._id)
                        .map(id => {
                            if (id === undefined) {
                                return '?';
                            }
                            return id;
                        });
                    console.log(
                        'KundeService.createBarChart(): labels:',
                        labels,
                    );

                    const data = kundenGueltig.map(b => b.kategorie);
                    /* eslint-disable array-bracket-newline */
                    const datasets: Array<ChartDataSets> = [
                        { label: 'Bewertung', data },
                    ];
                    /* eslint-enable array-bracket-newline */

                    const config: ChartConfiguration = {
                        type: 'bar',
                        data: { labels, datasets },
                    };
                    return config;
                }),
            )
            .subscribe(config =>
                this.diagrammService.createChart(chartElement, config),
            );
    }

    /**
     * Ein Liniendiagramm erzeugen und bei einem Tag <code>canvas</code>
     * einf&uuml;gen.
     * @param chartElement Das HTML-Element zum Tag <code>canvas</code>
     */
    createLinearChart(chartElement: HTMLCanvasElement) {
        console.log('KundeService.createLinearChart()');
        const uri = this.baseUriKunde;

        return this.httpClient
            .get<Array<KundeServer>>(uri)
            .pipe(
                // ID aus Self-Link
                map(kunden => kunden.map(b => this.setKundeId(b))),
                map(kunden => {
                    const kundenGueltig = kunden.filter(
                        b => b._id !== undefined && b.kategorie !== undefined,
                    );
                    const labels = kundenGueltig
                        .map(b => b._id)
                        .map(id => {
                            if (id === undefined) {
                                return '?';
                            }
                            return id;
                        });
                    console.log(
                        'KundeService.createLinearChart(): labels:',
                        labels,
                    );

                    const data = kundenGueltig.map(b => b.kategorie);
                    /* eslint-disable array-bracket-newline */
                    const datasets: Array<ChartDataSets> = [
                        { label: 'Bewertung', data },
                    ];
                    /* eslint-enable array-bracket-newline */

                    const config: ChartConfiguration = {
                        type: 'line',
                        data: { labels, datasets },
                    };
                    return config;
                }),
            )
            .subscribe(config =>
                this.diagrammService.createChart(chartElement, config),
            );
    }

    /**
     * Ein Tortendiagramm erzeugen und bei einem Tag <code>canvas</code>
     * einf&uuml;gen.
     * @param chartElement Das HTML-Element zum Tag <code>canvas</code>
     */
    createPieChart(chartElement: HTMLCanvasElement) {
        console.log('KundeService.createPieChart()');
        const uri = this.baseUriKunde;

        return this.httpClient
            .get<Array<KundeServer>>(uri)
            .pipe(
                // ID aus Self-Link
                map(kunden => kunden.map(kunde => this.setKundeId(kunde))),
                map(kunden => {
                    const kundenGueltig = kunden.filter(
                        b => b._id !== undefined && b.kategorie !== undefined,
                    );
                    const labels = kundenGueltig
                        .map(b => b._id)
                        .map(id => {
                            if (id === undefined) {
                                return '?';
                            }
                            return id;
                        });
                    console.log(
                        'KundeService.createPieChart(): labels:',
                        labels,
                    );
                    const kategorien = kundenGueltig.map(b => b.kategorie);

                    const backgroundColor: Array<ChartColor> = [];
                    const hoverBackgroundColor: Array<ChartColor> = [];
                    for (let i = 0; i < kategorien.length; i++) {
                        backgroundColor.push(
                            this.diagrammService.getBackgroundColor(i),
                        );
                        hoverBackgroundColor.push(
                            this.diagrammService.getHoverBackgroundColor(i),
                        );
                    }

                    const data: ChartData = {
                        labels,
                        datasets: [
                            {
                                data: kategorien,
                                backgroundColor,
                                hoverBackgroundColor,
                            },
                        ],
                    };

                    const config: ChartConfiguration = { type: 'pie', data };
                    return config;
                }),
            )
            .subscribe(config =>
                this.diagrammService.createChart(chartElement, config),
            );
    }

    /**
     * Suchkriterien in Request-Parameter konvertieren.
     * @param suchkriterien Suchkriterien fuer den GET-Request.
     * @return Parameter fuer den GET-Request
     */
    private suchkriterienToHttpParams(
        suchkriterien: Suchkriterien | undefined,
    ): HttpParams {
        console.log(
            'KundeService.suchkriterienToHttpParams(): suchkriterien=',
            suchkriterien,
        );
        let httpParams = new HttpParams();

        if (suchkriterien === undefined) {
            return httpParams;
        }

        const { nachname, geschlecht, interessen } = suchkriterien;
        const { lesen, reisen, sport } = interessen;

        if (nachname !== '') {
            httpParams = httpParams.set('nachname', nachname);
        }
        if (geschlecht !== '') {
            httpParams = httpParams.set('geschlecht', geschlecht);
        }
        if (reisen) {
            httpParams = httpParams.set('reisen', 'true');
        }
        if (lesen) {
            httpParams = httpParams.set('lesen', 'true');
        }
        if (sport) {
            httpParams = httpParams.set('sport', 'true');
        }
        return httpParams;
    }

    private setKundeId(kunde: KundeServer) {
        const { _links } = kunde;
        if (_links !== undefined) {
            const selfLink = _links.self.href;
            if (typeof selfLink === 'string') {
                const lastSlash = selfLink.lastIndexOf('/');
                kunde._id = selfLink.slice(lastSlash + 1);
            }
        }
        if (kunde._id === undefined) {
            kunde._id = 'undefined';
        }
        return kunde;
    }
}

/* eslint-enable no-underscore-dangle */

export interface Suchkriterien {
    nachname: string;
    geschlecht: Geschlecht | '';
    interessen: { lesen: boolean; sport: boolean; reisen: boolean };
}
/* eslint-enable max-lines,no-null/no-null */
