import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisAnuncioRoutingModule } from './misanuncio-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MisAnunciosComponent } from "./coremisanuncios/misanuncios.component";
import { EditarAnuncioComponent } from './editanuncio/editanuncio.component';
import { GaleriaAnuncioComponent } from './galerianuncio/galerianuncio.component';
import { DarBajaComponent } from './darbaja/darbaja.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
@NgModule({
    imports: [
        CommonModule,
        MisAnuncioRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ProgressbarModule.forRoot()
    ],
    declarations: [
        MisAnunciosComponent,
        EditarAnuncioComponent,
        GaleriaAnuncioComponent,
        DarBajaComponent
    ],
    exports: [
    ]
})
export class MisAnuncioModule { }
