import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnunciateGratisRoutingModule } from './anunciategratis-routing.module';
import { OnlyNumber } from '../../directivas/onlynumber.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './index/indexcomponent';
//import { NavBarTabComponent } from "../../view/panelcontrol/anuncio/navbar-tab/navbar-tab.component"
// import { DatosContactoComponent } from "../../view/panelcontrol/anuncio/datoscontacto/datoscontactos.component";
// import { DatosGeneralesComponent } from "../../view/panelcontrol/anuncio/datosgenerales/datosgenerales.component";
// import { AparienciaComponent } from "../../view/panelcontrol/anuncio/apariencia/apariencia.component";
// import { TarifasComponent } from "../../view/panelcontrol/anuncio/tarifa/tarifas.component";
// import { ServiciosComponent } from "../../view/panelcontrol/anuncio/servicios/servicios.component";
// import { GaleriaComponent } from "../../view/panelcontrol/anuncio/galeria/galeria.component";
// import { AnuncioModule } from "../../view/panelcontrol/anuncio/anuncio.module";
import { NavBarTabComponent } from "./navbar-tab/navbar-tab.component"
import { DatosContactoComponent } from "./datoscontacto/datoscontactos.component"
import { DatosGeneralesComponent } from "./datosgenerales/datosgenerales.component"
import { AparienciaComponent } from "./apariencia/apariencia.component"
import { ServiciosComponent } from "./servicios/servicios.component"
import { GaleriaComponent } from "./galeria/galeria.component"
 import { SharedCompoentModule } from '../../view/shared/sharedcomponent.module';
//import { HeaderShared } from "../shared/header/header.component"
@NgModule({
    imports: [
        CommonModule,
        AnunciateGratisRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedCompoentModule
        //HeaderShared
        //AnuncioModule
    ],
    declarations: [
        IndexComponent,
        NavBarTabComponent,
        DatosContactoComponent,
        DatosGeneralesComponent,
        AparienciaComponent,       
        ServiciosComponent,        
        GaleriaComponent,      
        //HeaderShared  
        //OnlyNumber
    ],
    exports: [
    ]
})
export class AnunciateGratisModule { }
