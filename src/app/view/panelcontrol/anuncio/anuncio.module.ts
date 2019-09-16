import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnuncioRoutingModule } from './anuncio-routing.module';
import { AnuncioComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnlyNumber } from '../../../directivas/onlynumber.directive';
import { DatosContactoComponent } from "./datoscontacto/datoscontactos.component"
import { DatosGeneralesComponent } from "./datosgenerales/datosgenerales.component"
import { AparienciaComponent } from "./apariencia/apariencia.component"
import { TarifasComponent } from "./tarifa/tarifas.component"
import { ServiciosComponent } from "./servicios/servicios.component"
import { NavBarTabComponent } from "./navbar-tab/navbar-tab.component"
import { GaleriaComponent } from "./galeria/galeria.component"
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
        OnlyNumber
    ],
    // entryComponents: [
    //     DatosContactoComponent,
    //     DatosGeneralesComponent,
    //     AparienciaComponent,
    //     TarifasComponent,
    //     ServiciosComponent,    
    //     GaleriaComponent        
    //   ],
    exports: [
         NavBarTabComponent,
        // DatosContactoComponent,
        // DatosGeneralesComponent,
        // AparienciaComponent,
        // TarifasComponent,
        // ServiciosComponent,    
        // GaleriaComponent       
    ]
})
export class AnuncioModule { }
