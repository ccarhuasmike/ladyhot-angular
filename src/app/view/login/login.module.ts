import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresarComponent } from './ingresar/ingresar.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        IngresarComponent
    ],
    exports: [
    ]
})

export class LoginAnuncioModule { }