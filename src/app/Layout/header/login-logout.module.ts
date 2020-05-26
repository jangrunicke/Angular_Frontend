import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginLogoutComponent } from './login-logout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [LoginLogoutComponent],
    exports: [LoginLogoutComponent],
    imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule],
})
export class LoginLogoutModule {}
