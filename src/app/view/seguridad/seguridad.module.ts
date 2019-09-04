import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { EscogerPasswordComponent } from './escoger-password/escoger-password.component';
import { PasswordGuardadoComponent } from './password-guardado/password-guardado.component';
import { RestablecerPasswordComponent } from './restablecer-password/restablecer-password.component';
import { SendEmailComponent } from './sent-email/sent-email.component';
import { SendEmailPasswordComponent } from './sent-email-password/sent-email-password.component';
import { LoginRoutingModule } from './seguridad-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent,
        EscogerPasswordComponent,
        PasswordGuardadoComponent,
        RestablecerPasswordComponent,
        SendEmailComponent,
        SendEmailPasswordComponent
    ],

    exports: [

    ]
})

export class SeguridadModule { }