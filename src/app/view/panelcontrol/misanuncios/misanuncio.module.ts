import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisAnuncioRoutingModule } from './misanuncio-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from "./index/index.component";
import { EditarComponent } from './editar/editar.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { DarBajaComponent } from './darbaja/darbaja.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
@NgModule({
    imports: [
        CommonModule,
        MisAnuncioRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ProgressbarModule.forRoot(),
    ],
    declarations: [
        IndexComponent,
        EditarComponent,
        GaleriaComponent,
        DarBajaComponent
    ],
    exports: [
    ]
})
export class MisAnuncioModule { }
