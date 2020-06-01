import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-newsletter</code>
 */
@Component({
    selector: 'hs-update-newsletter',
    templateUrl: './update-newsletter.component.html',
    styleUrls: ['./update-newsletter.component.css'],
})
export class UpdateNewsletterComponent implements OnInit {
    // <hs-update-kategorie [form]="form" [currentValue]="...">
    @Input()
    readonly form!: FormGroup;
    @Input()
    readonly currentValue: boolean | undefined;

    newsletter!: FormControl;

    ngOnInit() {
        console.log(
            'UpdateNewsletterComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.newsletter = new FormControl(this.currentValue);
        this.form.addControl('newsletter', this.newsletter);
    }
}
