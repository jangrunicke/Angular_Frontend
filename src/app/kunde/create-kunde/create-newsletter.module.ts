import { CreateNewsletterComponent } from './create-newsletter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreateNewsletterComponent],
    exports: [CreateNewsletterComponent],
    imports: [ReactiveFormsModule, MatFormFieldModule, MatSlideToggleModule],
})
export class CreateNewsletterModule {}
