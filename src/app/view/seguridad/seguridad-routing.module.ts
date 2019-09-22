import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EscogerPasswordComponent } from './escoger-password/escoger-password.component';
import { PasswordGuardadoComponent } from './password-guardado/password-guardado.component';
import { RestablecerPasswordComponent } from './restablecer-password/restablecer-password.component';
import { SendEmailComponent } from './sent-email/sent-email.component';
import { SendEmailPasswordComponent } from './sent-email-password/sent-email-password.component';
import { IndexComponent } from './index/index.component';
const routes: Routes = [
    {
        path:'',    
        component: IndexComponent, 
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login'
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            
            {
                path: 'EscogerPassword/:token',
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
        ]
    }   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {
}