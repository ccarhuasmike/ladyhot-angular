import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresarComponent } from './index/index.component';
import { EscogerPasswordComponent } from './escoger-password/escoger-password.component';
import { PasswordGuardadoComponent } from './password-guardado/password-guardado.component';
import { RestablecerPasswordComponent } from './restablecer-password/restablecer-password.component';
import { SendEmailComponent } from './sent-email/sent-email.component';
import { SendEmailPasswordComponent } from './sent-email-password/sent-email-password.component';
const routes: Routes = [
    {
        path: '',
        redirectTo: 'ingresar',
        pathMatch: 'full'
    },
    {
        path: 'ingresar',
        component: IngresarComponent,
    }
    ,
    {
        path: 'EscogerPassword',
        component: EscogerPasswordComponent,
    },
    {
        path: 'PasswordGuardado',
        component: PasswordGuardadoComponent,
    },
    {
        path: 'RestablecerPassword',
        component: RestablecerPasswordComponent,
    },
    {
        path: 'SendEmail',
        component: SendEmailComponent,
    },
    {
        path: 'SendEmailPassword',
        component: SendEmailPasswordComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {
}