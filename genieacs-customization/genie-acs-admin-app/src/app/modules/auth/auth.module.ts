import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        AuthRoutingModule,
        CommonModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ToastModule,
    ],
    providers: [],
})
export class AuthModule {}
