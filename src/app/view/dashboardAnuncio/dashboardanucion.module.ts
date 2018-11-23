import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboadAnuncioRoutingModule } from './dashboardanucion-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreAnuncioComponent } from './core/core.component';
import { NuevoAnuncioComponent } from './nuevoanuncio/nuevoanuncio.component';
import { MisAnunciosComponent } from './misanuncios/misanuncios.component';
import { ContactarComponent } from './contactar/contactar.component';
// import { AnuncioComponent } from './anuncio/anuncio.component';

// import { OnlyNumber } from '../../directivas/onlynumber.directive';
// import { DatosContactoComponent } from "./anuncio/datoscontacto/datoscontactos.component";
// import { DatosGeneralesComponent } from "./anuncio/datosgenerales/datosgenerales.component";
// import { AparienciaComponent } from "./anuncio/apariencia/apariencia.component";
// import { TarifasComponent } from "./anuncio/tarifa/tarifas.component";
// import { ServiciosComponent } from "./anuncio/servicios/servicios.component";
// import { NavBarTabComponent } from "./anuncio/navbar-tab/navbar-tab.component";
// import { GaleriaComponent } from "./anuncio/galeria/galeria.component";
// import { MisAnunciosComponent } from "./misanuncios/misanuncios.component";
@NgModule({
    imports: [
        CommonModule,
        DashboadAnuncioRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        CoreAnuncioComponent,
        NuevoAnuncioComponent,
        MisAnunciosComponent,
        ContactarComponent
        // AnuncioComponent,
        // DatosContactoComponent,
        // DatosGeneralesComponent,
        // AparienciaComponent,
        // TarifasComponent,
        // ServiciosComponent,
        // NavBarTabComponent,
        // GaleriaComponent,
        // MisAnunciosComponent,
        // OnlyNumber
    ],
    exports: [
    ]
})
export class DashboadAnuncioModule { }
