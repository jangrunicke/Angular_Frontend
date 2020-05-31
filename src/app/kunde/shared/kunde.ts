/* eslint-disable max-lines */

// import { Addresse } from './adresse';
// import { Umsatz } from './umsatz';

const MIN_RATING = 0;
const MAX_RATING = 5;

export enum Geschlecht {
    MAENNLICH = 'M',
    WEIBLICH = 'W',
    DIVERS = 'D',
}

export enum Familienstand {
    LEDIG = 'L',
    VERHEIRATET = 'VH',
    GESCHIEDEN = 'G',
    VERWITWET = 'VW',
}

/**
 * Gemeinsame Datenfelder unabhaengig ob die Kundendaten von einem Server oder einem Formular kommen
 */
export interface KundeShared {
    _id?: string;
    nachname: string;
    email?: string;
    newsletter?: boolean;
    homepage?: string;
    geschlecht?: Geschlecht;
    familienStand?: Familienstand | '';
    geburtsdatum?: string;
    version?: number;
    // umsatz?: Umsatz;
    // adresse?: Adresse;
}

interface Link {
    href: string;
}

export interface ServerResponse {
    _embedded: {
        kundeList: Array<KundeServer>;
    };
}

/**
 * Daten vom und zum REST-Server;
 * <ul>
 *  <li> Arrays fuer mehrere Werte, di ein einem Formular als Checkbox dargestellt werden.
 *  <li> Datean mit Zahlen als Datentyp, di in einem Formular nur als String handhabbar sind.
 * </ul>
 */
export interface KundeServer extends KundeShared {
    kategorie?: number;
    interessen?: Array<string>;
    adresse: {
        plz?: string | undefined;
        ort?: string | undefined;
    };
    user?: {
        username?: string;
        password?: string;
    };
    username?: string;
    _links?: {
        self: Link;
        list?: Link;
        add?: Link;
        update?: Link;
        remove?: Link;
    };
}

/**
 * Daten aus einem Formular:
 * <ul>
 *  <li> je 1 Control fuer jede CheckBox und
 *  <li> ausserdem Strings fuer Eingefehlder fuer Zahlen.
 */
export interface KundeForm extends KundeShared {
    kategorie: number;
    username?: string;
    password?: string;
    plz?: string;
    ort?: string;
    reisen?: boolean;
    sport?: boolean;
    lesen?: boolean;
}

export class Kunde {
    private static readonly SPACE = 2;

    /* eslint-disable no-invalid-this */
    kategorieArray: Array<boolean> =
        this.kategorie === undefined
            ? new Array(MAX_RATING - MIN_RATING).fill(false)
            : new Array(this.kategorie - MIN_RATING)
                  .fill(true)
                  .concat(new Array(MAX_RATING - this.kategorie));
    /* eslint-enable no-invalid-this */

    geburtsdatum: Date | undefined;
    interessen: Array<string>;

    // wird aufgerufen von fromServer() oder von fromForm()
    // eslint-disable-next-line max-params
    private constructor(
        public _id: string | undefined,
        public nachname: string,
        public email: string | undefined,
        public kategorie: number | undefined,
        public familienstand: Familienstand | undefined | '',
        public geschlecht: Geschlecht | undefined,
        geburtsdatum: string | undefined,
        public homepage: string | undefined,
        public newsletter: boolean | undefined,
        interessen: Array<string> | undefined,
        public username: string | undefined,
        public password: string | undefined,
        public ort: string | undefined,
        public plz: string | undefined,
        public version: number | undefined,
    ) {
        this.geburtsdatum =
            geburtsdatum === undefined ? new Date() : new Date(geburtsdatum);
        this.interessen = interessen === undefined ? [] : interessen;
        console.log('Kunde(): this=', this);
    }

    /**
     *  Ein Kunde-Objekt mit JSON-Daten erzeugen, die von einem RESTful Web
     *  Service kommen
     *  @param kunde JSON-Objekt mit Daten vom RESTful Web Server
     *  @return Das initialisierte Kunde-Objekte
     */
    static fromServer(kundeServer: KundeServer, etag?: string) {
        let selfLink: string | undefined;
        const { _links } = kundeServer;
        if (_links !== undefined) {
            const { self } = _links;
            selfLink = self.href;
        }
        let id: string | undefined;
        if (selfLink !== undefined) {
            const lastSlash = selfLink.lastIndexOf('/');
            id = selfLink.slice(lastSlash + 1);
        }

        let version: number | undefined;
        if (etag !== undefined) {
            const versionStr = etag.slice(1, -1);
            version = Number.parseInt(versionStr, 10);
        }

        const kunde = new Kunde(
            id,
            kundeServer.nachname,
            kundeServer.email,
            kundeServer.kategorie,
            kundeServer.familienStand,
            kundeServer.geschlecht,
            kundeServer.geburtsdatum,
            kundeServer.homepage,
            kundeServer.newsletter,
            kundeServer.interessen,
            kundeServer.username,
            kundeServer.user?.password,
            kundeServer.adresse.ort,
            kundeServer.adresse.plz,
            version,
        );
        console.log('Kunde.fromServer(): kunde=', kunde);
        return kunde;
    }

    /**
     * Ein Kunde-Objekt mit JSON-Daten erzeugen, die von einem Formular kommen.
     * @param kunde JSON-Objekt mit Daten vom Formular
     * @return Das initialisierte Kunde-Objekt
     */
    static fromForm(kundeForm: KundeForm) {
        console.log('Kunde.fromForm(): kundeForm=', kundeForm);
        const interessen: Array<string> = [];
        if (kundeForm.reisen === true) {
            interessen.push('R');
        }
        if (kundeForm.lesen === true) {
            interessen.push('L');
        }
        if (kundeForm.sport === true) {
            interessen.push('S');
        }

        const kunde = new Kunde(
            kundeForm._id,
            kundeForm.nachname,
            kundeForm.email,
            Number(kundeForm.kategorie),
            kundeForm.familienStand,
            kundeForm.geschlecht,
            kundeForm.geburtsdatum,
            kundeForm.homepage,
            kundeForm.newsletter,
            interessen,
            kundeForm.username,
            kundeForm.password,
            kundeForm.ort,
            kundeForm.plz,
            kundeForm.version,
        );
        console.log('Kunde.fromForm(): kunde=', kunde);
        return kunde;
    }

    get datumFormatted() {
        const formatter = new Intl.DateTimeFormat('de', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return this.geburtsdatum === undefined
            ? ''
            : formatter.format(this.geburtsdatum);
    }

    /**
     * Abfrage, ob im Kundennamen der angegebene Teilstring enthalten ist. Dabei
     * wird nicht auf Gross-/Kleinschreibung geachtet.
     * @param titel Zu ueberpruefender Teilstring
     * @return true, falls der Teilstring im Filmtitel enthatlen ist. Sonst false.
     */
    containsTitel(nachname: string) {
        return this.nachname === undefined
            ? false
            : this.nachname.toLowerCase().includes(nachname.toLowerCase());
    }

    /**
     *  Die Kategorie des Kundens um 1 erhoehen
     */
    rateUp() {
        if (this.kategorie !== undefined && this.kategorie < MAX_RATING) {
            this.kategorie++;
        }
    }

    /**
     * Die Kategorie des Kunden um 1 erniedrigen
     */
    rateDown() {
        if (this.kategorie !== undefined && this.kategorie > MIN_RATING) {
            this.kategorie--;
        }
    }

    /**
     * Abfrage, ob der Kunde das Geschlecht hat
     * @param geschlecht des Kunden
     * @return true, falls der Kunde das Geschlecht hat.
     */
    hasGeschlecht(geschlecht: string) {
        return this.geschlecht === geschlecht;
    }

    /**
     * Aktualisierung der STammdaten des Kunden-Objekts
     * @param nachname der Nachname des Kunden
     * @param kategorie die Kategorie des Kunden
     * @param familienStand der FamielenStand des Kunden
     * @param homepage die Homepage des Kunden
     * @param newsletter des Kunden
     */
    // eslint-disable-next-line max-params
    updateStadmmdaten(
        nachname: string,
        kategorie: number | undefined,
        familienStand: Familienstand | undefined,
        homepage: string | undefined,
        newsletter: boolean | undefined,
    ) {
        this.nachname = nachname;
        this.kategorie = kategorie;
        this.familienstand = familienStand;
        this.homepage = homepage;
        this.newsletter = newsletter;
    }

    /**
     * Abfrage ob es zum Kunde auch Interessen gibt.
     * @return true, falls es mindestens eine Interesse gibt. Sonst false.
     */
    hasInteressen() {
        if (this.interessen === undefined) {
            return false;
        }
        return this.interessen.length !== 0;
    }

    /**
     * Abfrage, ob der Kunde die angegebene Interesse hat.
     * @param interesse die zu ueberpruefende Interesse
     * @return true, falls es die Interesse gibt. Sonst false.
     */
    hasInteresse(interesse: string) {
        if (this.interessen === undefined) {
            return false;
        }
        return this.interessen.includes(interesse);
    }

    /**
     * Aktualisierung der Interessen des Kunden-Objekts.
     * @param reisen ist die Interesse Reisen
     * @param lesen ist di eInteressen Lesen
     * @param sport ist die Inteersse Sport
     */
    updateInterssen(reisen: boolean, lesen: boolean, sport: boolean) {
        this.resetInteressen();
        if (lesen) {
            this.addInteresse('L');
        }
        if (reisen) {
            this.addInteresse('R');
        }
        if (sport) {
            this.addInteresse('S');
        }
    }

    /**
     * Konvertierung des Kundenobjektes in ein JSON-Objekt fuer den RESTful WebService.
     * @return Das JSON-Objekt fuer den RESTful Web Service
     */
    toJSON(): KundeServer {
        const geburtsdatum =
            this.geburtsdatum === undefined
                ? undefined
                : this.geburtsdatum.toISOString();
        console.log(`toJSON(): datum=${geburtsdatum}`);
        console.log(`toJSON(): familienstand=${this.familienstand}`);
        return {
            _id: this._id,
            nachname: this.nachname,
            email: this.email,
            kategorie: this.kategorie,
            geschlecht: this.geschlecht,
            familienStand: this.familienstand,
            geburtsdatum,
            newsletter: this.newsletter,
            homepage: this.homepage,
            interessen: this.interessen,
            adresse: {
                plz: this.plz,
                ort: this.ort,
            },
            user: {
                username: this.username,
                password: this.password,
            },
        };
    }

    toString() {
        // eslint-disable-next-line no-null/no-null,unicorn/no-null
        return JSON.stringify(this, null, Kunde.SPACE);
    }

    private resetInteressen() {
        this.interessen = [];
    }

    private addInteresse(interesse: string) {
        if (this.interessen === undefined) {
            this.interessen = [];
        }
        this.interessen.push(interesse);
    }
}

/* eslint-enable max-lines */
