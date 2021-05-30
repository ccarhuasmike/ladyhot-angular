import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnunciateGratisRoutingModule } from './anunciategratis-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './index/indexcomponent';
import { NavBarTabComponent } from "./navbar-tab/navbar-tab.component"
import { DatosContactoComponent } from "./datoscontacto/datoscontactos.component"
import { DatosGeneralesComponent } from "./datosgenerales/datosgenerales.component"
import { AparienciaComponent } from "./apariencia/apariencia.component"
import { ServiciosComponent } from "./servicios/servicios.component"
import { GaleriaComponent } from "./galeria/galeria.component"
import { TarifasComponent } from "./tarifa/tarifas.component"
import { SharedCompoentModule } from '../../view/shared/sharedcomponent.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderReusableModule } from '../modulos-reusable/header-reusable.module';
@NgModule({
    imports: [
        CommonModule,
        AnunciateGratisRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedCompoentModule,
        NgxSpinnerModule,
        HeaderReusableModule
    ],
    declarations: [
        IndexComponent,
        NavBarTabComponent,
        DatosContactoComponent,
        DatosGeneralesComponent,
        AparienciaComponent,
        ServiciosComponent,
        TarifasComponent,
        GaleriaComponent
    ],
    exports: [
    ]
})
export class AnunciateGratisModule { }
