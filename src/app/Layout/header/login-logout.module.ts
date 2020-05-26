import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginLogoutComponent } from './login-logout.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [LoginLogoutComponent],
    exports: [LoginLogoutComponent],
    imports: [CommonModule, FormsModule],
})
export class LoginLogoutModule {}
