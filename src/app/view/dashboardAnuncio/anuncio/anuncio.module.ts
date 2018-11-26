import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnuncioRoutingModule } from './anuncio-routing.module';
import { AnuncioComponent } from '../anuncio/anuncio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnlyNumber } from '../../../directivas/onlynumber.directive';
import { DatosContactoComponent } from "../anuncio/datoscontacto/datoscontactos.component";
import { DatosGeneralesComponent } from "../anuncio/datosgenerales/datosgenerales.component";
import { AparienciaComponent } from "../anuncio/apariencia/apariencia.component";
import { TarifasComponent } from "../anuncio/tarifa/tarifas.component";
import { ServiciosComponent } from "../anuncio/servicios/servicios.component";
import { NavBarTabComponent } from "../anuncio/navbar-tab/navbar-tab.component";
import { GaleriaComponent } from "../anuncio/galeria/galeria.component";
// import { MisAnunciosComponent } from "../misanuncios/misanuncios.component";
@NgModule({
    imports: [
        CommonModule,
        AnuncioRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AnuncioComponent,
        DatosContactoComponent,
        DatosGeneralesComponent,
        AparienciaComponent,
        TarifasComponent,
        ServiciosComponent,
        NavBarTabComponent,
        GaleriaComponent,
        // MisAnunciosComponent,
        OnlyNumber
    ],
    exports: [
    ]
})
export class AnuncioModule { }
