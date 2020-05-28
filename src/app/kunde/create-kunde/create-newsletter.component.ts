import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { OnInit } from '@angular/core';

/**
 * Komponente mit dem Tag &lt;hs-create-newsletter&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Buch zu realisieren.
 */
@Component({
    selector: 'hs-create-newsletter',
    templateUrl: './create-newsletter.component.html',
    styleUrls: ['./create-newsletter.component.css'],
})
export class CreateNewsletterComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly newsletter = new FormControl(false);

    ngOnInit() {
        console.log('CreateLieferbarComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('newsletter', this.newsletter);
    }
}
